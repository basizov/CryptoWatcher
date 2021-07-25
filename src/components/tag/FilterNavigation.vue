<template>
  <div class="filter">
    <the-button
      class="filter__btn"
      @click="turnPreviousPage"
    >
      Previous page
    </the-button>
    <the-input
      v-model:modelValue="filter"
      :currentComponent="false"
      class="filter__input"
      placeholder="Enter the search items"
      @update="update"
      @keydown.enter="findCrypto"
    />
    <the-button
      class="filter__btn"
      @click="turnNextPage"
    >
      Next page
    </the-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'FilterNavigation',
  inheritAttrs: false,
  props: {
    page: {
      type: Number as PropType<number>,
      required: true
    },
    filter: {
      type: String as PropType<string>,
      required: true
    }
  },
  methods: {
    update(value: string) {
      this.$emit('update', value);
    },
    turnPreviousPage() {
      this.$emit('turnPreviousPage');
    },
    turnNextPage() {
      this.$emit('turnNextPage');
    },
    findCrypto() {
      this.$emit('findCrypto');
    }
  }
});
</script>

<style lang="scss" scoped>
.filter {
  margin-top: 1rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  &__btn {
    width: 25%;
  }
  &__input {
    width: 50%;
  }
}
</style>
