<template>
  <div class="modal" v-if="props.isShown" @click="hideModal">
    <div @click.stop class="modal__content" >
      <inline-svg
        @click="hideModal"
        class="button_close"
        src="/src/images/close_window.svg"
        width="30"
        height="30"
      />
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
export default defineComponent({
  name: 'ModalUi'})
</script>


<script setup lang="ts"  >
import { watch } from 'vue'
import type { IPropsModal } from '@/type/propsType';

const props = withDefaults(defineProps<IPropsModal>(), {
  isShown: false,
})
const emit = defineEmits(['update:isShown'])

function hideModal() {
      emit('update:isShown', false)
 }

 function handleKeyUp(event:KeyboardEvent) {
  if (event.key === 'Escape') {
    hideModal()
  }
}
 watch(props, () => {
      if (props.isShown === false) {
        window.removeEventListener('keyup', handleKeyUp)
      } else {
        window.addEventListener('keyup', handleKeyUp)
      }
  })
  
</script>

<style scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  z-index: 999999999;
}

.modal__content {
  margin: auto;
    border-radius: 12px;
  background-color: var(--vt-c-white);
  padding: 35px;
  position: relative;

}
.button_close {
  position: absolute;
  top: 10px;
  right: 10px;
  fill: var(--vt-c-blue);
  cursor: pointer;
}
</style>
