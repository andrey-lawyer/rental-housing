<template>
    <button :class="myClass" >
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ButtonUi",
  props: {
    myClass: {
      type: String,
      default: "btn"
  }
  },
  });
  
</script>

<style scoped>
.btn {
  cursor: pointer;
  padding: 10px 15px;
  background: var(--vt-c-blue);
  display: inline-block;
  color: var(--vt-c-white);
  border: none;
  border-radius: 15px;
  cursor: pointer;
}
.link{
  padding: 3px 10px;
  background-color: var(--vt-c-white);
  border-radius: 10px;
  border: rgba(237, 0, 20, 0.918) solid 2px;
  color: rgba(237, 0, 20, 0.918);
  cursor: pointer;

}

.button{
  border-radius: 4px;
  cursor: pointer;
  padding: 10px 15px;
  background: var(--vt-c-blue);
  display: inline-block;
  color: var(--vt-c-white);
  border: none;
  cursor: pointer;
  width: 200px;
}


</style>
