<template>
  <div class="highlights" v-if="works">
    <NuxtLink
      :to="localePath({ name: 'work', params: { work: work.slug } })"
      v-for="work of works"
      :key="work.id"
    >
      {{ work.title }}
    </NuxtLink>

    <!-- <div class="images">
      <img src="https://picsum.photos/id/1019/200/" />
      <img src="https://picsum.photos/id/102/200/" />
    </div> -->
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
        },
        {
          title: "TITLE",
          slug: "slug",
        },
        {
          title: "TITLE",
          slug: "slug",
        },
        {
          title: "TITLE",
          slug: "slug",
        },
        {
          title: "TITLE",
          slug: "slug",
        },
        {
          title: "TITLE",
          slug: "slug",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.highlights {
  @apply w-full
    h-full
    bg-green-800
    flex
    overflow-auto
    relative
    
    md:flex-col;

  a {
    @apply h-full
        flex
        justify-center
        items-center
        text-white
        uppercase
        font-cabinet-grotesk
        text-54
        border-r
        border-white
        
        md:border-b
        md:border-r-0;
    writing-mode: vertical-rl;

    @screen md {
      writing-mode: horizontal-tb;
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
    @apply absolute
        inset-0
        w-screen
        h-full
        pointer-events-none;

    img {
      @apply absolute;

      &:nth-child(1) {
        @apply top-0
            left-0;
      }

      &:nth-child(2) {
        @apply bottom-0
            right-0;
      }
    }
  }
}
</style>