<template>
  <main class="container">
    <search-crypto @addCrypto="addCrypto" />
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
import {
  getFromLocalStorage,
  setToLocalStorage
} from './store/localStorageStore';

export default defineComponent({
  components: { SearchCrypto, CryptosList, ValletGraphic },
  name: 'App',
  data() {
    return {
      cryptos: [] as ICrypto[],
      selectedCrypto: null as ICrypto | null,
      graph: [13, 25, 123, 456, 9, 123] as number[]
    };
  },
  created() {
    this.cryptos = getFromLocalStorage();
  },
  methods: {
    addCrypto(cryptoName: string) {
      this.cryptos.push({
        id: Date.now().toString(),
        name: cryptoName,
        price: '-'
      });

      setToLocalStorage(this.cryptos);
    },
    chooseCrypto(crypto: ICrypto) {
      if (this.selectedCrypto === crypto) {
        this.selectedCrypto = null;
      } else this.selectedCrypto = crypto;
      // this.graph = [];
    },
    deleteCrypto(crypto: ICrypto) {
      this.cryptos = this.cryptos.filter(c => c !== crypto);
      if (this.selectedCrypto === crypto) {
        this.selectedCrypto = null;
      }

      setToLocalStorage(this.cryptos);
    },
    unSelectCrypto() {
      this.selectedCrypto = null;
    }
  }
});
</script>

<style lang="scss" src="./style.scss"></style>
