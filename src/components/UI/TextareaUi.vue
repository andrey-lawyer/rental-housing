<template>
  <div>
    <textarea
      :value="value"
      @input="updateValue"
      class="textarea"
      .rows="$props.rows"
      .maxlength="$props.length"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TextareaUi',
  props: {
    value: [String],
    length: Number,
    rows: Number
  },
  methods: {
    updateValue(e: Event) {
      this.$emit('update:value', (e.target as HTMLTextAreaElement).value)
    }
  }
})
</script>

<style scoped>
.textarea {
  width: 100%;
  display: block;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: #fff;
  transition: box-shadow 0.3s ease-in-out;
  border-radius: 4px;
  border: 2px solid var(--vt-c-blue);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.textarea:focus {
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

@media screen and (max-width: 767px) {
  .input {
    max-width: 168px;
  }
}
</style>
