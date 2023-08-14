<template>
    <select class="select-ui" :value="modelValue" @change="changeOption">
    <option  disabled value="">Choose an region</option>
    <option 
      v-for="option in options as ISelect []"
      :key="option.value"
      :value="option.value"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import type { ISelect } from "@/type/selectType";
import { defineComponent } from "vue";

export default defineComponent({
  name: "SelectUi",
  props: {
    modelValue: {
      type: String,
    },
    options: {
      type: Array,
      default: () => [] as ISelect[],
    },
  showSelect:{
      type: Boolean,
    } 
  },
  methods: {
    changeOption(event: Event) {     
      this.$emit("update-showSelect", false);  
      this.$emit(
        "update:modelValue",
        (event.target as HTMLSelectElement).value
      );
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
  .select-ui {
  display: block;
  width: 200px;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #fff;
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
  border: 1px solid var(--vt-c-blue)
}

.select-ui:focus {
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); 
}


@media screen and (max-width: 767px) {
  .select-ui {
  max-width: 168px;
}
}
</style>
