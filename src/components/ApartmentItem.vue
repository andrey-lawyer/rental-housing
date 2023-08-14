<template>
  <img
    
    loading="lazy"
    class="apartment-img"
    :src="image"
    :alt="props.apartment?.image"
    @load="changeShowObserver"
  />
 
  <div class="apartment-description" @click="pushPage">
    <p class="apartment-p">{{ props.apartment?.shortDescription }}</p>
    <p class="apartment-p">{{ props.apartment?.price }}</p>
    <p class="question">Click the image to discover more!</p>
  </div>
</template>

<script setup lang="ts" name="ApartmentItem">
import { useRouter } from 'vue-router'



import type {IApartment} from '@/type/apartmentType'
import type { PropType } from 'vue'
const props = defineProps({
  apartment: Object as PropType<IApartment>,
  showElement: Boolean,
  showObserver: Boolean
})
const emit = defineEmits(['load-update'])

const changeShowObserver = () => {
  emit('load-update')
}

const router = useRouter()

function pushPage() {
      router.push({
        name: 'selected-apartments',
        params: { id: props.apartment?.id },     
      })
    }

    
const image =
  import.meta.env.VITE_PROJECT_NAME_SUPABASE + import.meta.env.VITE_IMAGES + props.apartment?.image
</script>

<style>
.apartment-img {
  position: relative;
  display: block;
  height: 100%;
  object-fit: cover;
}
.block-description{
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0,2;
  color:var(--vt-c-white);
}
.apartment-description {
  z-index: 2;
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;

  color: var(--vt-c-white);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: opacity 1s;

  cursor: pointer;
}

.apartment-p {
  text-align: center;
}
.question{
  display: block;
  margin-top: 40px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
@media screen and (min-width: 768px) {
  .apartment-p {
    font-size: 16px;
  }
  .apartment-img{ 
    width: 342px;
  }
 
}
@media screen and (min-width: 1200px) {
  .apartment-p {
    font-size: 18px;
  }
  .apartment-img{ 
    width: 574px;
  }
 
}
</style>
