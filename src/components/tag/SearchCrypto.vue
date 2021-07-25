<template>
  <section class="search">
    <the-input
      v-model:modelValue="cryptoName"
      placeholder="Enter crypto name:"
      @keydown.enter="addCrypto"
      class="search__input"
    />
    <the-button @click="addCrypto" class="search__btn">Search</the-button>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchCrypto',
  data() {
    return {
      cryptoName: ''
    };
  },
  methods: {
    addCrypto() {
      this.$emit('addCrypto', this.cryptoName);
      this.cryptoName = '';
    }
  }
});
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  display: flex;
  align-self: center;
  gap: 1rem;
  &__input {
    width: 100%;
  }
}
</style>
