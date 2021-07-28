<template>
  <section class="graphic" ref="graphRef" v-if="crypto">
    <div class="graphic__title">{{ crypto.name }} - USD</div>
    <div class="graphic__lines">
      <div
        class="graphic__line"
        v-for="(h, key) in sliceGraph"
        :key="key"
        :style="{
          height: `${h}%`,
          width: `${lineWidth}px`
        }"
      ></div>
    </div>
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="far"
      data-icon="times-circle"
      class="svg-inline--fa fa-times-circle fa-w-16 graphic__close"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      @click="unSelectCrypto"
    >
      <path
        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
      ></path>
    </svg>
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
    },
    graph: {
      type: Array as PropType<number[]>,
      default: []
    }
  },
  emits: {
    unSelectCrypto: () => null
  },
  data() {
    return {
      maxGrapthElements: 1 as number,
      lineWidth: 35 as number
    };
  },
  mounted() {
    window.addEventListener('resize', this.calculatedGrapthWidth);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculatedGrapthWidth);
  },
  computed: {
    normilizedGraph(): number[] {
      const minValue = Math.min(...this.graph);
      const maxValue = Math.max(...this.graph);

      if (minValue === maxValue) {
        return this.graph.map(() => 50);
      }
      return this.graph.map(
        (price) => 5 + ((price - minValue) * 95) / (maxValue - minValue)
      );
    },
    sliceGraph(): number[] {
      this.calculatedGrapthWidth();
      if (this.normilizedGraph.length > this.maxGrapthElements) {
        return this.normilizedGraph.slice(
          this.normilizedGraph.length - this.maxGrapthElements,
          this.normilizedGraph.length
        );
      }
      return this.normilizedGraph;
    }
  },
  methods: {
    calculatedGrapthWidth() {
      if (this.$refs.graphRef) {
        const graphWidth = (this.$refs.graphRef as HTMLDivElement)
          .clientWidth;

        this.maxGrapthElements = Math.floor(graphWidth / this.lineWidth);
      }
    },
    unSelectCrypto() {
      this.$emit('unSelectCrypto');
    }
  }
});
</script>

<style lang="scss" scoped>
.graphic {
  margin-top: 1rem;
  position: relative;
  width: 100%;
  &__title {
    font-weight: 700;
    font-size: 2rem;
  }
  &__lines {
    position: relative;
    display: flex;
    align-items: flex-end;
    gap: 0.1rem;
    border-left: 0.3rem solid var(--secondary);
    border-bottom: 0.3rem solid var(--secondary);
    margin-top: 1rem;
    width: 100%;
    height: 37rem;
  }
  &__line {
    width: 3rem;
    background-color: var(--classic);
  }
  &__close {
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
    width: 3rem;
    height: 3rem;
    fill: var(--white);
    transition: fill linear 250ms;
    &:hover {
      fill: var(--white-07);
    }
    &:active {
      fill: var(--white-08);
    }
  }
}
</style>
