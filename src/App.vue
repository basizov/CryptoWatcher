<template>
  <main class="container">
    <search-crypto @searchCrypto="searchCrypto" />
    <cryptos-list
      :cryptos="cryptos"
      :selectedCrypto="selectedCrypto"
      @deleteCrypto="deleteCrypto"
      @chooseCrypto="chooseCrypto"
    />
    <vallet-graphic
      :crypto="selectedCrypto"
      @unSelectCrypto="unSelectCrypto"
      :graph="graph"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CryptosList from './components/tag/CryptosList.vue';
import SearchCrypto from './components/tag/SearchCrypto.vue';
import ValletGraphic from './components/tag/ValletGraphic.vue';
import { ICrypto } from './models/ICrypto';

export default defineComponent({
  components: { SearchCrypto, CryptosList, ValletGraphic },
  name: 'App',
  data() {
    return {
      cryptos: [
        { id: Date.now().toString(), name: 'USD', price: '5000' },
        { id: Date.now().toString(), name: 'USD', price: '5000' }
      ] as ICrypto[],
      selectedCrypto: null as ICrypto | null,
      graph: [13, 25, 123, 456, 9, 123] as number[]
    };
  },
  methods: {
    searchCrypto(cryptoName: string) {
      this.cryptos.push({
        id: Date.now().toString(),
        name: cryptoName,
        price: '-'
      });
    },
    chooseCrypto(crypto: ICrypto) {
      if (this.selectedCrypto === crypto) {
        this.selectedCrypto = null;
      } else this.selectedCrypto = crypto;
    },
    deleteCrypto(crypto: ICrypto) {
      this.cryptos = this.cryptos.filter(c => c !== crypto);
      if (this.selectedCrypto === crypto) {
        this.selectedCrypto = null;
      }
    },
    unSelectCrypto() {
      this.selectedCrypto = null;
    }
  }
});
</script>

<style lang="scss" src="./style.scss"></style>
