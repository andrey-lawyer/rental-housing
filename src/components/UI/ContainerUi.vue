<template >
<div class ="container"> 
   <slot></slot>
  </div>
</template>

<script  lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContainerUi",
  });
</script>

<style >
.container {
  min-width: 320px;
  max-width: 448px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 20px;
  padding-right: 20px;
}
  @media screen and (min-width: 768px) {
    .container {
    max-width: 768px;
    padding-left: 32px;
    padding-right: 32px;
}
  }
  @media screen and (min-width: 1200px) {
    .container {
    max-width: 1200px;
    padding-left: 16px;
    padding-right: 16px;
    }
  }
</style>