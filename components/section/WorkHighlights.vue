<template>
  <div class="slider">
    <div
      class="works"
      ref="swiper"
      :style="{
        backgroundColor,
        color,
        borderColor
        }"
    >
      <div
        class="highlights swiper-wrapper"
        ref="container"
        :style="{borderColor}"
      >
        <div
          v-for="work of works"
          :key="work.id"
          class="work swiper-slide"
          :data-work="work.id"
        >
          <NuxtLink
            class="wrapper"
            :to="localePath({ name: 'works-slug', params: { slug: work.slug } })"
          >
            <div class="work-title">
              {{ work.title }}
              <span class="date">{{ work.date }} </span>
            </div>
          </NuxtLink>

        </div>
        <div
          ref="previews"
          class="previews"
        >
          <div
            class="images"
            :style="{
              transform
            }"
            v-for="work in works"
            :key="work.id + '-image'"
            :class="[$get(work, 'previewLayout'), { active: currentWorkPreview(work.id)}]"
          >
            <figure
              v-for="preview of $get(work, 'previewImages')"
              :key="preview.id"
            >
              <img :src="preview.url" />
            </figure>
          </div>
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
      scrollWidth: 0,
      scrollPos: 0,
      transform: null,
      clonesWidth: 0,
    };
  },

  async mounted() {
    await this.$nextTick();
    if (!process.client) return;
    const self = this;

    const swiper = new Swiper(this.$refs.swiper, {
      slidesPerView: 4,
      loop: true,
      sticky: false,
      modules: [FreeMode],
      loopedSlidesLimit: false,
      loopAdditionalSlides: 6,
      freeMode: {
        enabled: true,
        momentum: false,
      },
      spaceBetween: 0,
    });

    window.requestAnimationFrame(self.setActive);
  },

  methods: {
    currentWorkPreview(workId) {
      return workId == this.currentWorkId;
    },

    getTransform(el) {
      var transform = window
        .getComputedStyle(el, null)
        .getPropertyValue("-webkit-transform");
      var results = transform.match(
        /matrix(?:(3d)\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}\d+))(?:, (-{0,1}\d+))(?:, (-{0,1}\d+)), -{0,1}\d+\)|\(-{0,1}\d+(?:, -{0,1}\d+)*(?:, (-{0,1}.+))(?:, (-{0,1}.+))\))/
      );

      if (!results) return [0, 0, 0];
      if (results[1] == "3d") return results.slice(2, 5);

      results.push(0);
      return results.slice(5, 8);
    },

    setActive() {
      const works = this.$refs.container.querySelectorAll(".work");
      let x = this.getTransform(this.$refs.container)[0];
      let calculatedX = -x;
      this.$refs.previews.style.transform = `translate3D(${calculatedX}px, 0, 0)`;

      works &&
        works.forEach((work) => {
          const width = window.innerWidth / 2;
          const left = Math.abs(work.getBoundingClientRect().left);
          const right = Math.abs(work.getBoundingClientRect().right);

          if (
            width % left <= work.offsetWidth &&
            width % right >= work.offsetWidth &&
            left % right >= work.offsetWidth
          ) {
            this.currentWorkId = work.dataset.work;
            work.classList.add("active");
          } else {
            work.classList.remove("active");
          }
        });

      window.requestAnimationFrame(this.setActive);
    },
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
    overflow-x-hidden;
}

.highlights {
  @apply
    static
    w-screen;

  .work {
    @apply
      transition-transform
      text-opacity-10
      duration-500;

    border-color: inherit;

    .work-title {
      @apply
        text-opacity-30
        transition-all;
    }

    &.active {
      @apply
        opacity-100;

      .work-title {
        @apply
          z-50
          scale-125;
      }

      &::after {
        @apply
          h-screen

          
          w-0
          right-0
          opacity-100
          absolute
          block
          border-r;

        content: "";
        border-color: inherit;
      }
    }

    .wrapper {
      @apply h-full
          flex
          justify-center
          items-center
          uppercase
          font-sans
          text-[40px]
          min-w-[90px]
          px-1
          
          md:px-0
          md:text-100;

        border-color: inherit;

      &::after {
        @apply
          h-screen
          w-0
          right-0
          absolute
          opacity-20
          block
          border-r;

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

  .preview-images-enter-active,
  .preview-images-leave-active {
    transition: opacity 0.5s ease;
  }
  .preview-images-enter,
  .preview-images-leave-to {
    @apply opacity-0;
  }
}

.previews {
  @apply
    w-screen
    fixed
    transition-none
    z-10
    h-screen;

  .images {
    @apply
      opacity-0;

    &.active {
      @apply
        opacity-100
    }
  }

}

  .images {
    @apply 
      absolute
      pointer-events-none
      right-0
      top-0
      transition-opacity
      w-screen;

    height: calc(100vh - 6.75rem);
    top: 3.375;
    max-width: 72rem;

    @screen md {
      height: calc(100vh - 3.375rem);
    }

    figure {
      @apply absolute;

      img {
        @apply w-full
          object-cover
          absolute;
      }
    }

  &.layout1 {
    figure {
      &:nth-child(1) {
        @apply
          pb-[64.5%]
          w-[90%]
          z-10

          md:w-[70%]
          md:pb-[45%];
      }

      &:nth-child(2) {
        @apply bottom-0
        z-10
        right-0
        pb-[67%]
        w-1/2
        md:right-[7.5rem]
        md:w-[29%]
        md:pb-[40%];
      }

      &:nth-child(3) {
        @apply bottom-0
          left-0
          pb-[62%]
          w-1/2;
      }
    }
  }

  &.layout2 {
    figure {
      &:nth-child(1) {
        @apply right-0
        z-10
        top-[25%]
        w-[60%]
        pb-[112.16%]

        md:top-0
        md:w-2/5;
      }

      &:nth-child(2) {
        @apply
          left-[10%]
          pb-[86.8%]
          w-[35%]
          z-[100]

          md:w-[30%]
      }

      &:nth-child(3) {
        @apply top-full
          transform
          z-10;
      }
    }
  }
}
</style>