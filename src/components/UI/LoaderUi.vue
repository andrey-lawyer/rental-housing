<template>
      <div class="spinner"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: "LoaderUi",
})
</script>

<style scoped>

.spinner {
  z-index: 9999999999;
  position: fixed;
  width: 100px;
  height: 100px;
  outline: 10px solid white;
  border: 15px solid #0a02255b;
  border-top: 15px solid #3e217a;
  border-radius: 50%;
  animation: spin 2s linear infinite;
  top:50%;
  left:47%;
  transform:translate(-50%, -50%);
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>