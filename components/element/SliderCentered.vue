<template>
  <div
    ref="swiper"
    class="swiper centered"
  >
    <div class="swiper-wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.min";
import "swiper/swiper-bundle.min.css";

export default {
  props: {
    centered: {
      type: Boolean,
    },
  },

  async mounted() {
    await this.$nextTick();
    new Swiper(this.$refs.swiper, {
      slidesPerView: "auto",
      loop: true,
      centeredSlides: true,
      spaceBetween: 20,
      breakpoints: {
        1280: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },

        1024: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },

        768: {
          slidesPerView: "auto",
        },
      },
    });
  },
};
</script>

<style lang="scss">
    .swiper {
        &.centered {
          @apply
            w-full;

            .swiper-wrapper {
                @apply
                  w-1/2;

                .swiper-slide {
                    @apply
                      w-[300px];
                }
            }
        }
    }
</style>