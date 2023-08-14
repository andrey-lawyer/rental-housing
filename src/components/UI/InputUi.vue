<template>
  <div>
    <input
      :value="modelValue"
      @input="updateValue"
      class="input"
      type="text"
      .placeholder="$props.placeholder"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputUi',
  props: {
    modelValue: [String, Number],
    showSelect: {
      type: Boolean
    },
    placeholder: String
  },
  emits: ['update-showSelect', 'update:modelValue'],
  methods: {
    updateValue(e: Event) {
      this.$emit('update-showSelect', false)
      this.$emit('update:modelValue', (e.target as HTMLInputElement).value)
    }
  }
})
</script>

<style scoped>
.input {
  display: block;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #fff;
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vt-c-blue)
}

.input:focus {
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 767px) {
  .input {
    max-width: 168px;
  }
}
</style>
