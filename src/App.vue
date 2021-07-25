<template>
  <main class="container">
    <add-new-crypto @addCrypto="addCrypto" />
    <filter-navigation
      :filter="filter"
      :page="page"
      @update="update"
      @turnNextPage="turnNextPage"
      @turnPreviousPage="turnPreviousPage"
      @findCrypto="findCrypto"
    />
    <cryptos-list
      :cryptos="filteredCryptos()"
      :selectedCrypto="selectedCrypto"
      @deleteCrypto="deleteCrypto"
      @chooseCrypto="chooseCrypto"
    />
    <vallet-graphic
      :graph="graph"
      :crypto="selectedCrypto"
      @unSelectCrypto="unSelectCrypto"
    />
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CryptosList from './components/tag/CryptosList.vue';
import FilterNavigation from './components/tag/FilterNavigation.vue';
import AddNewCrypto from './components/tag/AddNewCrypto.vue';
import ValletGraphic from './components/tag/ValletGraphic.vue';
import { ICrypto } from './models/ICrypto';
import {
  getFromLocalStorage,
  setToLocalStorage
} from './store/localStorageStore';
import {
  getUrlParams,
  setUrlParams
} from './store/urlParamsStore';

export default defineComponent({
  components: {
    AddNewCrypto,
    CryptosList,
    ValletGraphic,
    FilterNavigation
  },
  name: 'App',
  data() {
    return {
      cryptos: [] as ICrypto[],
      selectedCrypto: null as ICrypto | null,
      graph: [
        13,
        25,
        123,
        456,
        9,
        123
      ] as number[],
      filter: '' as string,
      page: 1 as number,
      hasNextPage: true as boolean
    };
  },
  created() {
    this.cryptos = getFromLocalStorage();
    const { page, filter } = getUrlParams();

    this.page = parseInt(page);
    this.filter = filter;
  },
  methods: {
    update(value: string) {
      this.filter = value;
    },
    addCrypto(cryptoName: string) {
      this.filter = '';
      this.page = (this.cryptos.length % 8) - 1;
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
      this.cryptos = this.cryptos.filter(
        (c) => c !== crypto
      );
      if (this.selectedCrypto === crypto) {
        this.selectedCrypto = null;
      }

      setToLocalStorage(this.cryptos);
    },
    unSelectCrypto() {
      this.selectedCrypto = null;
    },
    filteredCryptos() {
      const start = (this.page - 1) * 8;
      const end = this.page * 8;

      const filteredCryptos = this.cryptos.filter(
        (crypto) =>
          crypto.name
            .toLowerCase()
            .includes(this.filter.toLowerCase())
      );

      this.hasNextPage =
        filteredCryptos.length > end;

      return filteredCryptos.slice(start, end);
    },
    turnNextPage() {
      if (this.hasNextPage) {
        ++this.page;
      }
    },
    turnPreviousPage() {
      if (this.page > 1) {
        --this.page;
      }
    },
    findCrypto() {
      const foundCrypto = this.cryptos.find(
        (f) => f.name === this.filter
      );

      if (foundCrypto) {
        this.selectedCrypto = foundCrypto;
      }
    }
  },
  watch: {
    filter() {
      this.page = 1;
      setUrlParams({
        page: this.page,
        filter: this.filter
      });
    },
    page() {
      setUrlParams({
        page: this.page,
        filter: this.filter
      });
    }
  }
});
</script>

<style lang="scss" src="./style.scss"></style>
