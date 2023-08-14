import { ref } from "vue"


export default function useModal() {
const modelVisible = ref(false)

function showModal() {
  modelVisible.value = true
}
function closeModal() {
  modelVisible.value = false
}

return {modelVisible, showModal,closeModal}
}