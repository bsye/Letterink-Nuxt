<template>
  <div class="slider">
    <div
      class="works"
      ref="swiper"
      :style="{
        backgroundColor,
        color,
        borderColor,
      }"
    >
      <div
        class="highlights swiper-wrapper"
        ref="container"
        :style="{ borderColor }"
      >
        <div
          v-for="work of works"
          :key="work.id"
          ref="work"
          class="work swiper-slide"
          :data-work="work.id"
          :class="{ active: work.id == currentWorkId }"
        >
          <NuxtLink
            class="wrapper"
            :to="
              localePath({ name: 'works-slug', params: { slug: work.slug } })
            "
          >
            <div
              class="work-title"
              @mouseover="setWorkDesktop(work.id)"
              @mouseleave="resetsetWorkDesktop"
            >
              {{ work.title }}
              <span class="date">{{ work.date }} </span>
            </div>
          </NuxtLink>
        </div>
        <div class="previews" ref="previews">
          <WorkPreviews
            v-for="work in works"
            :previewType="$get(work, 'previewLayout')"
            :previews="$get(work, 'previewImages')"
            :active="currentWorkPreview(work.id)"
            :key="work.id + '-image'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, FreeMode } from "swiper";
import "swiper/swiper-bundle.min.css";

gsap.registerPlugin(ScrollTrigger);

export default {
  props: {
    highlights: Object,
  },

  data() {
    return {
      currentWorkId: null,
      animation: false,
    };
  },

  async mounted() {
    await this.$nextTick();
    if (!process.client) return;
    const self = this;

    let swiper = {};
    swiper.options = {
      slidesPerView: 4,
      loop: true,
      modules: [FreeMode],
      loopedSlidesLimit: false,
      loopAdditionalSlides: 16,
      freeMode: {
        enabled: true,
        momentumBounce: false,
        minimumVelocity: 0.07,
        momentumVelocityRatio: 2.3,
        momentum: true,
        sticky: false,
      },
      spaceBetween: 0,
    };

    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        if (!this.$get(swiper, "init.destroyed")) {
          swiper.init = new Swiper(this.$refs.swiper, swiper.options);
        }

        window.requestAnimationFrame(self.setActive);
      } else {
        if (swiper.init) swiper.init.destroy(true, false);
        window.cancelAnimationFrame(self.setActive);
      }
    });

    if (window.innerWidth >= 768) return;

    window.requestAnimationFrame(self.setActive);
    swiper.init = new Swiper(this.$refs.swiper, swiper.options);
  },

  methods: {
    currentWorkPreview(workId) {
      return workId == this.currentWorkId;
    },

    setWorkDesktop(workId) {
      if (window.innerWidth > 767) this.currentWorkId = workId;
      return;
    },

    resetsetWorkDesktop() {
      if (window.innerWidth > 767) this.currentWorkId = null;
      return;
    },

    setActive() {
      window.requestAnimationFrame(this.setActive);

      let x = this.$getStyleTransformValues(this.$refs.container)[0];
      this.$refs.previews.style.transform = `translate3D(${-x}px, 0, 0)`;

      const works = this.$refs.container.querySelectorAll(".work");
      works.forEach((work) => {
        if (this.$isElementCentered(work)) {
          this.currentWorkId = work.dataset.work;
          work.classList.add("active");
        } else {
          work.classList.remove("active");
        }
      });
    },
  },

  watch: {
    // color() {
    //   if (!process.client) return;
    //   document.querySelector("body").style.color = this.color;
    // },
  },

  computed: {
    works() {
      return this.$get(this.highlights, "works");
    },

    currentWork() {
      const currentWork = this.works.filter(
        (work) => work.id === this.currentWorkId
      )[0];

      return currentWork;
    },

    currentWorkColor() {
      return this.$get(this.currentWork, "color[0].workColor[0]");
    },

    backgroundColor() {
      return this.$get(this.currentWorkColor, "backgroundColor");
    },

    color() {
      return this.$get(this.currentWorkColor, "textColor");
    },

    borderColor() {
      return this.$get(this.currentWorkColor, "textColor");
    },
  },
};
</script>

<style lang="scss" scoped>
.works {
  @apply
    overflow-x-hidden
    grow
    flex
    flex-col;
}

*,
.swiper-slide {
  @apply
    will-change-auto
    transform-gpu;
}

.slider {
  @apply
    grow
    relative
    flex
    flex-col;
}

.highlights {
  @apply
    static
    grow
    w-screen;

  &.swiper-wrapper {
    @apply
      md:h-full
      md:justify-evenly
      md:flex-col;

      @screen md {
        transform: none !important;

        .swiper-slide {
          width: unset !important;
        }
      }
  }

  .work {
    @apply
      text-opacity-10
      grow
      duration-500
      odd:font-serif

      first:pt-8
      md:flex
      md:items-center;

    border-color: inherit;

    .work-title {
      @apply
        text-opacity-30
        transition-all;
    }

    &.active {
      @apply
        z-50
        opacity-100;

      .wrapper {
        @apply
          pointer-events-auto;
      }

      .work-title {
        @apply
          md:scale-[1.02];
      }
    }

    .wrapper {
      @apply h-full
          flex
          justify-center
          items-center
          uppercase
          text-[40px]
          min-w-[90px]
          px-1
          
          md:px-0
          md:text-[8.5vh];

        border-color: inherit;

      &::after {
        @apply
          h-screen
          w-0
          right-0
          absolute
          opacity-20
          block
          border-r

          md:h-px
          md:w-screen
          md:right-0
          md:bottom-0
          md:border-b;

        content: "";
        border-color: inherit;
      }

      writing-mode: vertical-rl;

      @screen md {
        writing-mode: horizontal-tb;
        line-height: 5rem;
      }


      .work-title {
        @apply flex
          gap-x-2
          leading-none
          min-h-[56px]
          text-center
          transform
          -rotate-180
          
          md:rotate-0;

        .date {
          @apply text-sm
            font-sans
            font-normal
            hidden
            
            md:flex;
        }
      }

      &:nth-child(3n + 2) {
        @apply font-serif;
      }

      &:nth-child(3n + 3) {
        @apply font-bold;
      }
    }
  }
}

.previews {
  @apply
    w-full
    will-change-auto
    absolute
    transition-none
    pointer-events-none
    z-10
    overflow-hidden
    h-full;
}
</style>