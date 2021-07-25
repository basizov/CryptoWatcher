<template>
  <button class="btn btn-base">
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheButton'
});
</script>

<style lang="scss" scoped>
.btn {
  outline: none;
  cursor: pointer;
  padding: 1rem;
  font-weight: 700;
  background-color: transparent;
  border-radius: 0.3rem;
  min-width: 7.5rem;
  text-transform: uppercase;
  transition: background-color 0.25s linear, opacity 0.25s linear;
  &-base {
    border: 0.1rem solid var(--classic);
    &:hover {
      background-color: var(--classic);
    }
  }
  &-success {
    border: 0.1rem solid var(--success);
    &:hover {
      background-color: var(--success);
    }
  }
  &-failure {
    border: 0.1rem solid var(--failure);
    &:hover {
      background-color: var(--failure);
    }
  }
  &:active {
    opacity: 0.9;
  }
}
</style>
