<template>
  <div class="modal_google">
    <ButtonUi type="button"  class = "button_google" @click="original.dispatch('loginUser')">Sign in with Google</ButtonUi>
  </div>
</template>



<script setup lang="ts" name="ModalGoogle">
import { useStore } from 'vuex';

const {
    direct: { original }
  } = useStore()

</script>

<style scoped>
.modal_google{
    position: relative;
    width: 200px;
    height: 200px;
    background: url('src/images/google.jpg') no-repeat ;
    background-size: contain;
}
.button_google{
  width: 200px;
    position: absolute;
    top:95%;
left:50%;
transform:translate(-50%, -50%);

}
</style>
