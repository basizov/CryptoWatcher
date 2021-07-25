<template>
  <section class="search">
    <the-input
      v-model:modelValue="cryptoName"
      placeholder="Enter crypto name:"
      @keydown.enter="searchCrypto"
    />
    <the-button @click="searchCrypto">Search</the-button>
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
    searchCrypto() {
      this.$emit('searchCrypto', this.cryptoName);
      this.cryptoName = '';
    }
  }
});
</script>

<style lang="scss" scoped></style>
