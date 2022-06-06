<template>
  <section class="moodboards" v-if="moodboards">
    <div class="moodboards-label">
      <span v-if="yourMoodboards"> Your Moodboard </span>
      <span v-else> Inspirational Moodboard </span>
    </div>

    <div class="moodboards-content">
      <NuxtLink
        :to="
          localePath({
            name: 'inspirations-slug',
            params: { slug: moodboard.slug },
          })
        "
        class="moodboard"
        v-for="moodboard of moodboards"
        :key="moodboard.id"
      >
        <div class="moodboard-items" v-if="moodboard.inspirationItems">
          <figure
            class="moodboard-item"
            v-for="item of moodboard.inspirationItems"
            :key="item.id"
          >
            <img v-if="item.image.length" :src="item.image[0].url" />
          </figure>
        </div>

        <div class="moodboard-info">
          <div class="moodboard-title" v-if="moodboard.title">
            {{ moodboard.title }}
          </div>

          <div class="moodboard-counter">
            {{ moodboard.inspirationItems.length }} Images
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    moodboards: Array,
    yourMoodboards: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.moodboards {
  @apply pb-16;

  .moodboards-label {
    @apply uppercase
        text-sm
        font-cabinet-grotesk
        w-full
        text-center
        py-5;
  }

  .moodboards-content {
    @apply flex
      gap-x-5
      overflow-auto
      px-4

      md:justify-center;

    &::-webkit-scrollbar {
      @apply hidden;
    }

    .moodboard {
      @apply flex
          flex-col
          gap-y-5;

      .moodboard-items {
        @apply grid
            grid-cols-2
            grid-rows-2
            gap-1;
        height: 13.5rem;
        width: 13.5rem;

        .moodboard-item {
          @apply w-full;

          img {
            @apply w-full
                h-full
                object-cover;
          }

          &:nth-child(n + 5) {
            @apply hidden;
          }
        }
      }

      .moodboard-info {
        @apply flex
            flex-col
            justify-center
            items-center
            gap-y-1
            uppercase
            text-sm
            font-cabinet-grotesk;

        .moodboard-counter {
          @apply text-gray-primary;
        }
      }
    }
  }
}
</style>