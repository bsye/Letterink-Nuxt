<template>
  <NuxtLink
    class="moodboard"
    :to="localePath({
            name: 'inspirations-user-id',
            params: { id:  moodboard.id},
  })"
  >
    <div class="moodboard-items">
      <template v-if="moodboard.inspirationItems">
        <template v-for="(item, index) of moodboard.inspirationItems">
          <figure
            :key="index"
            v-if="index < 4"
            class="moodboard-item"
          >
            <img
              v-if="$get(item, 'image.length')"
              :src="item.image[0].url"
            />
          </figure>
        </template>
      </template>
      <figure class="moodboard-item placeholder"></figure>
      <figure class="moodboard-item placeholder"></figure>
      <figure class="moodboard-item placeholder"></figure>
      <figure class="moodboard-item placeholder"></figure>
    </div>

    <div class="moodboard-info">
      <div
        class="moodboard-title"
        v-if="moodboard.title"
      >
        {{ moodboard.title }}
      </div>

      <div class="moodboard-counter">
        {{ moodboard.inspirationItems.length }} Images
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    moodboard: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
    .moodboard {
      @apply flex
        flex-col
        gap-y-5;

      &:last-child {
        @apply mb-0;
      }

      .moodboard-items {
        @apply grid
            grid-cols-2
            grid-rows-2
            w-[13.5rem]
            gap-1;

        .moodboard-item {
          @apply 
            w-full
            pb-[100%]
            relative;

          img {
            @apply w-full
                h-full
                object-cover
                absolute;
          }

          &:nth-child(n + 5) {
            @apply hidden;
          }

        }

        .placeholder {
          @apply
            pb-[100%]
            bg-slate-100;
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
            font-sans;

        .moodboard-counter {
          @apply text-gray-primary;
        }
      }
    }
</style>