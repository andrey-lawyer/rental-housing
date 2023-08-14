<script setup lang="ts">
import useApartmentId from '@/hooks/useApartmentId'
import useCurrentUser from '@/hooks/useCurrentUser'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { addOrder } from '@/services/addOrders'
import useModal from '@/hooks/useModal'
import ModalReview from '@/components/ModalReview.vue'

const route = useRoute()
const { apartment } = useApartmentId(route.params.id)
const { user } = useCurrentUser()
const {
  direct: { original }
} = useStore()

const { modelVisible, showModal, closeModal } = useModal()

const image = computed(
  () =>
    import.meta.env.VITE_PROJECT_NAME_SUPABASE +
    import.meta.env.VITE_IMAGES +
    apartment.value?.image
)

onMounted(() => {
  original.dispatch('getCurrentUser');
});
</script>

<template>
  <main>
    <section>
      <ContainerUi>
        <div class="apartment-page">
          <div>
            <img class="apartment-img" loading="lazy" :src="image" :alt="apartment?.image" />
          </div>
          <div class="apartment-info">
            <h2 class="apartment-title">Contact information:</h2>
            <p>Phone: {{ apartment?.phone }}</p>
            <p>Place: {{ apartment?.place }}</p>
          </div>
        </div>
        <p class="apartment-description-id">{{ apartment?.description }}</p>
        <div class="block-reviews">
          <h3 class="apartment-title">Reviews:</h3>
          <template v-if="apartment && apartment.reviews.length > 0">
            <ul class="reviews-list">
              <li class="reviews-item" v-for="(review, index) in apartment?.reviews" :key="index">
                <p class="name_user">{{ review.nameUser }}</p>
                <p>{{ review.review }}</p>
              </li>
            </ul>
          </template>
          <div v-if="apartment && apartment.reviews.length === 0">
            <p>No reviews yet</p>
          </div>
        </div>
        <template v-if="user">
        <ButtonUi class="button" @click="() => addOrder(apartment, user, original)">
          Book an apartment</ButtonUi
        >
      </template>
        <div v-if="user" class="review">
          <p>Would you like to leave a review?</p>
          <button class="button-link" @click="showModal">Click here!</button>
        </div>
      </ContainerUi>
    </section>
    <ModalUi v-model:isShown="modelVisible">
      <ModalReview
        :user="user"
        :apartmentId="apartment?.id"
        :allReviews="apartment?.reviews"
        @onclick-review="closeModal"
      />
    </ModalUi>
  </main>
</template>

<style scoped>
.apartment-page {
  padding-top: 20px;
}
.apartment-img {
  border-radius: 10px;
  margin-bottom: 10px;
}

.apartment-description-id {
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid var(--vt-c-blue);
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
}
.apartment-info {
  padding: 10px;
  border-radius: 10px;
  border: 1px solid var(--vt-c-blue);
}
.block-reviews {
  padding: 5px 10px;
  border-radius: 10px;
  border: 1px solid var(--vt-c-blue);
  margin-bottom: 10px;
}

.apartment-title {
  text-align: center;
  margin-bottom: 5px;
  font-size: 22px;
}
.button {
  margin: 0 auto;
  display: block;
  margin-top: 10px;
  margin-bottom: 10px;
}

.review {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-bottom: 20px;
  font-size: 16px;
}
.name_user {
  text-align: center;
  font-weight: bold;
}
.button-link {
  border: none;
  background-color: transparent;
  color: var(--vt-c-blue);
  text-decoration: underline;
}
@media (min-width: 767px) {
  .apartment-page {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 10px;
  }
  .apartment-img {
    width: 460px;
    margin-bottom: 0;
  }
  @media (min-width: 1200px) {
    .apartment-img {
      width: 800px;
    }
  }
}
</style>
