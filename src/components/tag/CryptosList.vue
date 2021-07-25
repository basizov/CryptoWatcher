<template>
  <section class="cryptos">
    <div
      v-for="crypto in cryptos"
      :key="crypto.id"
      class="crypto"
      :class="{
        'crypto-active': selectedCrypto === crypto
      }"
      @click="chooseCrypto(crypto)"
    >
      <div class="crypto__info">
        <div class="crypto__name">{{ crypto.name }} - USD</div>
        <div class="crypto__price">{{ crypto.price }}</div>
      </div>
      <the-button class="crypto__btn" @click.stop="deleteCrypto(crypto)">
        Delete
      </the-button>
    </div>
  </section>
</template>

<script lang="ts">
import { ICrypto } from '@/models/ICrypto';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CryptosList',
  props: {
    cryptos: {
      type: Array as PropType<ICrypto[]>,
      default: []
    },
    selectedCrypto: {
      type: Object as PropType<ICrypto | null>,
      default: null
    }
  },
  methods: {
    chooseCrypto(crypto: ICrypto) {
      this.$emit('chooseCrypto', crypto);
    },
    deleteCrypto(crypto: ICrypto) {
      this.$emit('deleteCrypto', crypto);
    }
  }
});
</script>

<style lang="scss" scoped>
.cryptos {
  margin: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1em;
}
.crypto {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--primary);
  padding: 3em;
  gap: 3em;
  border-radius: 0.3rem;
  border: 0.1rem solid var(--black-03);
  box-shadow: 0 0 1rem var(--black-03);
  transition: border-color linear 150ms;
  &__name,
  &__price {
    text-align: center;
  }
  &__name {
    color: var(--white-07);
  }
  &__price {
    font-weight: 700;
    font-size: 2.8rem;
  }
  &__btn {
    margin: 0 auto;
  }
  &-active {
    border-color: var(--classic);
  }
}
</style>
