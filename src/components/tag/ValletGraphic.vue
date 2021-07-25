<template>
  <section class="graphic" v-if="crypto">
    {{ crypto }}
  </section>
</template>

<script lang="ts">
import { ICrypto } from '@/models/ICrypto';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'ValletGraphic',
  props: {
    crypto: {
      type: Object as PropType<ICrypto | null>,
      default: null
    }
  },
});
</script>

<style lang="scss" scoped></style>
