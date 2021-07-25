<template>
  <input type="text" class="input" :value="modelValue" @input="updateInput" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TheInput',
  props: {
    modelValue: {
      type: String as PropType<string>,
      required: true
    }
  },
  methods: {
    updateInput(event: InputEvent) {
      this.$emit('update:modelValue', (event.target as HTMLInputElement).value);
    }
  }
});
</script>

<style lang="scss" scoped>
.input {
  outline: none;
  padding: 1rem;
  background-color: transparent;
  box-shadow: 0 0 0.5em var(--black-03);
  border-radius: 0.3rem;
  min-width: 7.5rem;
  border: 0.1rem solid var(--classic);
  transition: border-color 0.25s linear;
  &:active,
  &:focus {
    border-color: var(--warning);
  }
}
</style>
