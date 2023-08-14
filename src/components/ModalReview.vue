<template>
  <div class="block-reviews">
    <h2 class="reviews-title">Leave your review here</h2>
    <TextareaUi @input.stop v-model:value="input" :rows="5" :length="75"></TextareaUi>
    <ButtonUi @click="onSendReviews" class="reviews-button">Send</ButtonUi>
  </div>
</template>

<script setup lang="ts" name="ModalReview">
import type { IReview } from '@/type/apartmentType'
import { addReview } from '@/services/addReview'
import type ICurrentUser from '@/type/userType'
import { ref, type PropType } from 'vue'

const props = defineProps({
  user: Object as PropType<ICurrentUser | null>,
  apartmentId: Number,
  allReviews: {
    type: Array as PropType<IReview[]>,
    default: () => []
  }
})
const emit = defineEmits(['onclick-review'])
const input = ref('')

const onSendReviews = async () => {
  const review = {
    nameUser: props.user?.name,
    review: input.value
  }
  const reviews = props.allReviews
  console.log(reviews)
  reviews.push(review)
  console.log(reviews)
  const data = await addReview(reviews, props.apartmentId)
  if (data) {
    emit('onclick-review')
  }
}
</script>

<style scoped>
.block-review {
  padding: 10px;
}
.reviews-title {
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 10px;
}
.reviews-button {
  width: 100%;
  margin-top: 10px;
}
</style>
