<template>
  <div>
    <div
      class="highlights"
      ref="container"
      :style="currentWorkBackgroundColor"
    >
      <div
        :to="localePath({ name: 'works-slug', params: { slug: work.slug } })"
        v-for="(work, index) of works"
        :key="work.id"
        class="work"
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
        v-for="(work, index) of works"
        :key="work.id"
        ref="clones"
        class="work"
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

      <transition name="preview-images">
        <div
          class="images"
          :class="$get(currentWork, 'previewLayout')"
        >
          <figure
            v-for="preview of currentWorkPreviews"
            :key="preview.id"
          >
            <img :src="preview.url" />
          </figure>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
      clonesWidth: 0,
    };
  },

  async mounted() {
    await this.$nextTick();
    if (!process.client) return;
    const self = this;

    this.reCalc();
    this.$refs.container.addEventListener("scroll", () => {
      self.setActive();
      window.requestAnimationFrame(self.scrollUpdate);
    });

    window.addEventListener("resize", () =>
      window.requestAnimationFrame(self.reCalc)
    );
  },

  methods: {
    getScrollPos() {
      return (
        this.$refs.container.scrollLeft - this.$refs.container.clientLeft || 0
      );
    },

    setScrollPos(pos) {
      this.$refs.container.scrollLeft = pos;
    },

    getClonesWidth() {
      this.$refs.clones.forEach((element) => {
        console.log(element.offsetWidth);
        this.clonesWidth = this.clonesWidth + element.offsetWidth;
      });
    },

    reCalc() {
      this.scrollPos = this.getScrollPos();
      this.scrollWidth = this.$refs.container.scrollWidth;
      this.getClonesWidth();
      if (this.scrollPos <= 0) {
        this.setScrollPos(1);
      }
    },

    scrollUpdate() {
      this.scrollPos = this.getScrollPos();

      if (this.clonesWidth + this.scrollPos >= this.scrollWidth)
        this.setScrollPos(1);
      else if (this.scrollPos <= 0)
        this.setScrollPos(this.scrollWidth - this.clonesWidth);
    },

    setActive() {
      const works = this.$refs.container.querySelectorAll(".work");

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

    currentWorkPreviews() {
      return this.$get(this.currentWork, "previewImages");
    },

    currentWorkColor() {
      return this.$get(this.currentWork, "color[0].workColor[0]");
    },

    currentWorkBackgroundColor() {
      const color = this.$get(this.currentWorkColor, "backgroundColor");
      return `background-color: ${color}; `;
    },

    currentWorkTextColor() {
      const color = this.$get(this.currentWorkColor, "textColor");
      return `color: ${color}; border-color: ${color};`;
    },
  },
};
</script>

<style lang="scss" scoped>
.highlights {
  @apply w-full
    h-full
    flex
    overflow-auto
    transition-colors
    
    md:flex-col;

  width: auto !important;
  max-width: unset !important;

  .work {
    @apply
      transition-all;

    &.active {
      @apply
        opacity-100
        scale-105
        z-50;
    }

    .wrapper {
      @apply h-full
          flex
          justify-center
          items-center
          text-black
          uppercase
          font-sans
          text-54
          border-r
          border-black
          px-1
          
          md:px-0
          md:text-100
          md:border-b
          md:border-r-0;
      writing-mode: vertical-rl;

      @screen md {
        writing-mode: horizontal-tb;
        line-height: 5rem;
      }


      .work-title {
        @apply flex
          gap-x-2
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

  .images {
    @apply fixed
      pointer-events-none
      w-full
      left-1/2
      transform
      -translate-x-1/2;
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
          padding-bottom: 64.5%;
          width: 90%;

          @screen md {
            width: 70%;
            padding-bottom: 45%;
          }
        }

        &:nth-child(2) {
          @apply bottom-0
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
          @apply right-0;
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

  .preview-images-enter-active,
  .preview-images-leave-active {
    transition: opacity 0.5s ease;
  }
  .preview-images-enter,
  .preview-images-leave-to {
    @apply opacity-0;
  }
}
</style>