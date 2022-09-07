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
          :to="localePath({ name: 'works-slug', params: { slug: work.slug } })"
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
      </div>
    </div>
    <div class="previews">
      <div
        class="images"
        :style="{
            transform
          }"
        v-for="work in works"
        :key="work.id + '-image'"
        v-show="currentWorkPreview(work.id)"
        :class="$get(work, 'previewLayout')"
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
      freeModeMomentumBounce: false,
      loopedSlides: 6,
      freeModeSticky: true,
      freeMode: true,
      spaceBetween: 0,
    });

    window.requestAnimationFrame(self.setActive);
  },

  methods: {
    currentWorkPreview(workId) {
      return workId == this.currentWorkId;
    },

    setActive(displace) {
      const works = this.$refs.container.querySelectorAll(".work");

      works &&
        works.forEach((work) => {
          const width = window.innerWidth / 2;
          const left = Math.abs(work.getBoundingClientRect().left);
          const right = Math.abs(work.getBoundingClientRect().right);
          console.log(left, right);

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

.slider {
  @apply
    relative;
}

.highlights {
  @apply
    w-screen;

  .work {
    @apply
      opacity-30
      transition-all;

    &.active {
      @apply
        opacity-100;

      .work-title {
        @apply
          z-50;
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
          border-r
          min-w-[90px]
          px-1
          
          md:px-0
          md:text-100
          md:border-b
          md:border-r-0;

        border-color: inherit;

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
          z-[60]
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
  .images {
    @apply absolute
      pointer-events-none
      inset-0
      w-full;

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
            z-10;

          padding-bottom: 64.5%;
          width: 90%;

          @screen md {
            width: 70%;
            padding-bottom: 45%;
          }
        }

        &:nth-child(2) {
          @apply bottom-0
          z-50
          right-0;
          padding-bottom: 67%;
          width: 50%;

          @screen md {
            right: 7.5rem;
            width: 29%;
            padding-bottom: 40%;
          }
        }

        &:nth-child(3) {
          @apply bottom-0
            left-0;

          padding-bottom: 62%;
          width: 50%;
        }
      }
    }

    &.layout2 {
      figure {
        &:nth-child(1) {
          @apply right-0
          z-10;
          top: 25%;
          width: 60%;
          padding-bottom: 112.16%;

          @screen md {
            top: 0;
            width: 40%;
          }
        }

        &:nth-child(2) {
          left: 10%;
          padding-bottom: 86.8%;
          width: 35%;

          @screen md {
            width: 30%;
          }
        }

        &:nth-child(3) {
          @apply top-full
            transform
            z-50;

            md:-translate-y-1/2;
          transform: translateY(calc(-50% - 54px));
          padding-bottom: 75.5%;
          width: 80%;

          @screen md {
            padding-bottom: 62%;
            width: 50%;
          }
        }
      }
    }
  }
}
</style>