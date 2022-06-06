<template>
  <div class="highlights" v-if="works" :style="currentWorkBackgroundColor">
    <NuxtLink
      :to="localePath({ name: 'works-slug', params: { slug: work.slug } })"
      v-for="work of works"
      :key="work.id"
      @mouseenter.native="currentWorkId = work.id"
      @mouseleave.native="currentWorkId = null"
      :style="currentWorkTextColor"
    >
      <div
        class="work-title"
        :class="currentWorkId === work.id && 'active-work'"
        :style="
          currentWorkTextColor && currentWorkId !== work.id
            ? 'opacity: .4;'
            : ''
        "
      >
        {{ work.title }}
        <span class="date">{{ work.date }} </span>
      </div>
    </NuxtLink>

    <transition name="preview-images">
      <div
        class="images"
        :class="currentWork && currentWork.previewLayout"
        v-if="currentWorkPreviews && currentWorkPreviews.length"
      >
        <figure v-for="preview of currentWorkPreviews" :key="preview.id">
          <img :src="preview.url" />
        </figure>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    highlights: Object,
  },

  data() {
    return {
      currentWorkId: null,
    };
  },

  computed: {
    works() {
      if (this.highlights.works && this.highlights.works.length)
        return this.highlights.works;

      return null;
    },

    currentWork() {
      const currentWork = this.works.filter(
        (work) => work.id === this.currentWorkId
      )[0];

      return currentWork;
    },

    currentWorkPreviews() {
      return this.currentWork ? this.currentWork.previewImages : null;
    },

    currentWorkColor() {
      if (
        this.currentWork &&
        this.currentWork.color &&
        this.currentWork.color.length &&
        this.currentWork.color[0].workColor &&
        this.currentWork.color[0].workColor.length
      ) {
        return this.currentWork.color[0].workColor[0];
      }

      return null;
    },

    currentWorkBackgroundColor() {
      if (this.currentWorkColor) {
        const color = this.currentWorkColor.backgroundColor;
        return `background-color: ${color}; `;
      }
      return "";
    },

    currentWorkTextColor() {
      if (this.currentWorkColor) {
        const color = this.currentWorkColor.textColor;
        return `color: ${color}; border-color: ${color};`;
      }
      return "";
    },
  },

  watch: {
    currentWorkTextColor(color) {
      this.$store.commit("updateTextColor", color);
    },

    currentWorkBackgroundColor(color) {
      this.$store.commit("updateBackgroundColor", color);
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
    relative
    transition-colors
    
    md:flex-col;

  &::-webkit-scrollbar {
    @apply hidden;
  }

  &:hover {
    a {
      @apply text-opacity-40;
    }
  }

  a {
    @apply h-full
        flex
        justify-center
        items-center
        text-black
        uppercase
        font-cabinet-grotesk
        text-54
        border-r
        border-black
        
        md:text-100
        md:border-b
        md:border-r-0;
    writing-mode: vertical-rl;
    line-height: 5rem;

    @screen md {
      writing-mode: horizontal-tb;
    }

    .work-title {
      @apply flex
        gap-x-2;

      .date {
        @apply text-sm
          font-cabinet-grotesk
          font-normal;
      }

      &.active-work {
        @apply relative
          z-10
          text-opacity-100;
      }
    }

    &:last-of-type {
      @apply border-none;
    }

    &:nth-child(3n + 2) {
      @apply font-gambetta;
    }

    &:nth-child(3n + 3) {
      @apply font-bold;
    }
  }

  .images {
    @apply fixed
      pointer-events-none
      w-full
      left-1/2
      transform
      -translate-x-1/2
      z-20;
    height: calc(100vh - 6.75rem);
    top: 3.375;
    max-width: 72rem;

    @screen md {
      height: calc(100vh - 3.375rem);
    }

    figure {
      @apply absolute
        overflow-hidden;

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

          @screen md {
            padding-bottom: 112.16%;
            width: 40%;
          }
        }

        &:nth-child(2) {
          left: 10%;
          padding-bottom: 86.8%;
          width: 30%;
        }

        &:nth-child(3) {
          @apply top-full
            transform
            -translate-y-1/2;

          padding-bottom: 62%;
          width: 50%;
        }
      }
    }
  }

  .preview-images-enter-active,
  .preview-images-leave-active {
    transition: opacity 0.3s;
  }
  .preview-images-enter,
  .preview-images-leave-to {
    opacity: 0;
  }
}
</style>