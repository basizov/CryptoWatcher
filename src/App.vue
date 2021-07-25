<template>
  <search-crypto @searchCrypto="searchCrypto" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SearchCrypto from './components/tag/SearchCrypto.vue';

export default defineComponent({
  components: { SearchCrypto },
  name: 'App',
  data() {
    const cryptos: string[] = ['Hello', 'World', '!'];

    return {
      cryptos
    };
  },
  methods: {
    searchCrypto(cryptoName: string) {
      if (this.cryptos.includes(cryptoName)) {
        alert('There is');
      } else alert("There isn't");
    }
  }
});
</script>

<style lang="scss" src="./style.scss"></style>
