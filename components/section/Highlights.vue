<template>
  <div class="highlights" v-if="works">
    <NuxtLink
      :to="localePath({ name: 'work', params: { work: work.slug } })"
      v-for="work of works"
      :key="work.id"
      @mouseenter.native="showPreview"
      @mouseleave.native="hidePreview"
    >
      <div class="work-title">
        {{ work.title }}
        <span class="date">{{ work.date }} </span>
      </div>
    </NuxtLink>

    <div class="images work-1 work-2">
      <figure>
        <img src="https://picsum.photos/600?random=1" />
      </figure>

      <figure>
        <img src="https://picsum.photos/600?random=2" />
      </figure>

      <figure>
        <img src="https://picsum.photos/600?random=3" />
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      works: [
        {
          title: "TITLE",
          slug: "slug",
          date: "2020",
        },
        {
          title: "TITLE",
          slug: "slug",
          date: "2020",
        },
        {
          title: "TITLE",
          slug: "slug",
          date: "2020",
        },
        {
          title: "TITLE",
          slug: "slug",
          date: "2020",
        },
        {
          title: "TITLE",
          slug: "slug",
          date: "2020",
        },
        {
          title: "TITLE",
          slug: "slug",
          date: "2020",
        },
      ],
    };
  },

  methods: {
    showPreview(e) {
      console.log("SHOW: ", e);
    },

    hidePreview(e) {
      console.log("HIDE: ", e);
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
    
    md:flex-col;

  &::-webkit-scrollbar {
    @apply hidden;
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
    }

    &:last-child {
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
          h-full
          object-cover
          absolute;
      }
    }

    &.work-1 {
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
      }
    }
  }

  // .images {
  //   @apply absolute
  //       inset-0
  //       w-screen
  //       h-full
  //       pointer-events-none;

  //   .preview-image {
  //     @apply absolute;

  //     &:nth-child(1) {
  //       @apply top-0
  //           left-0;
  //     }

  //     &:nth-child(2) {
  //       @apply bottom-0
  //           right-0;
  //     }

  //     .img-container {
  //       @apply relative;
  //       padding-bottom: 64.76%;
  //     }

  //     figure {
  //       @apply w-full
  //       absolute;

  //       img {
  //         @apply relative
  //           w-full
  //           h-full;
  //       }
  //     }
  //   }
  // }
}
</style>