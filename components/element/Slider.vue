<template>
  <div
    ref="swiper"
    class="swiper"
  >
    <div class="swiper-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
import { Swiper, Navigation } from "swiper";
import "swiper/swiper-bundle.min.css";

export default {
  props: {
    slidesPerView: {
      type: String,
      required: false,
      default: "2",
    },

    autoplay: {
      type: Boolean,
      required: false,
      default: false,
    },

    loop: {
      type: Boolean,
      required: false,
      default: false,
    },

    arrowBefore: {
      required: false,
    },

    arrowAfter: {
      required: false,
    },
  },

  async mounted() {
    await this.$nextTick();
    console.log(this.arrowBefore, this.arrowAfter);
    new Swiper(this.$refs.swiper, {
      slidesPerView: this.slidesPerView,
      autoplay: this.autoplay,
      loop: this.loop,
      spaceBetween: 20,
      modules: [Navigation],
      navigation: {
        nextEl: this.arrowAfter,
        prevEl: this.arrowBefore,
      },
    });
  },
};
</script>

<style lang="scss">
  .swiper-slide {
    > * {
      width: 100% !important;
    }
  }

  .swiper-button-lock {
    @apply
      block
      opacity-0
      pointer-events-none;
  }

  .swiper-button-disabled {
    @apply
      opacity-50;
  }
</style>