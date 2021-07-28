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
      :cryptos="paginatedCryptos"
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
import { getUrlParams, setUrlParams } from './store/urlParamsStore';
import { IUrlParams } from './models/IUrlParams';
import { getCryptos } from './store/cryptosAxiosStore';
import { subscribeToCrypto, unsubscribeFromCrypto } from './store/cryptosSocketsStore';

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
      graph: [13, 25, 123, 456, 9, 123] as number[],
      filter: '' as string,
      page: 1 as number
    };
  },
  created() {
    this.cryptos = getFromLocalStorage();

    this.cryptos.forEach((crypto) => {
      this.subscribeCryptoPrice(crypto.name);
    });
  },
  mounted() {
    const { page, filter } = getUrlParams();

    this.filter = filter;
    this.page = parseInt(page);
  },
  computed: {
    startIndex(): number {
      return (this.page - 1) * 8;
    },
    endIndex(): number {
      return this.page * 8;
    },
    filteredCryptos(): ICrypto[] {
      return this.cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(this.filter.toLowerCase())
      );
    },
    paginatedCryptos(): ICrypto[] {
      return this.filteredCryptos.slice(this.startIndex, this.endIndex);
    },
    hasNextPage(): boolean {
      return this.filteredCryptos.length > this.endIndex;
    },
    urlParams(): IUrlParams {
      return {
        page: this.page,
        filter: this.filter
      };
    }
  },
  methods: {
    normilizePrice(price: number | string) {
      if (typeof price === 'string') {
        return price;
      }
      return `${price > 1 ? price.toFixed(2) : price.toPrecision(2)}`;
    },
    updateCryptoPrice(cryptoName: string, newPrice: number) {
      this.cryptos
        .filter((c) => c.name === cryptoName)
        .forEach((c) => (c.price = `${newPrice}`));
    },
    subscribeCryptoPrice(cryptoName: string) {
      subscribeToCrypto(cryptoName, (price) => {
        this.updateCryptoPrice(cryptoName, price);
      });
    },
    update(value: string) {
      this.page = 1;
      this.filter = value;
    },
    addCrypto(cryptoName: string) {
      this.filter = '';
      this.page = Math.ceil(this.cryptos.length / 8);
      this.cryptos = [
        ...this.cryptos,
        {
          id: Date.now().toString(),
          name: cryptoName,
          price: '-'
        }
      ];
      this.subscribeCryptoPrice(cryptoName);
    },
    chooseCrypto(crypto: ICrypto) {
      if (this.selectedCrypto === crypto) {
        this.selectedCrypto = null;
      } else this.selectedCrypto = crypto;
    },
    deleteCrypto(crypto: ICrypto) {
      this.cryptos = this.cryptos.filter((c) => c !== crypto);
      if (this.selectedCrypto === crypto) {
        this.selectedCrypto = null;
      }
      unsubscribeFromCrypto(crypto.name);
    },
    unSelectCrypto() {
      this.selectedCrypto = null;
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
      const foundCrypto = this.cryptos.find((f) => f.name === this.filter);

      if (foundCrypto) {
        this.selectedCrypto = foundCrypto;
      }
    }
  },
  watch: {
    cryptos() {
      setToLocalStorage(this.cryptos);
      if (this.cryptos.length % 8 === 1) {
        ++this.page;
      }
    },
    selectedCrypto() {
      // this.graph = [];
    },
    paginatedCryptos() {
      if (this.paginatedCryptos.length === 0 && this.page > 1) {
        --this.page;
      }
    },
    urlParams() {
      setUrlParams(this.urlParams);
    }
  }
});
</script>

<style lang="scss" src="./style.scss"></style>
