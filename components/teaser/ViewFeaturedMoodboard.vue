<template>
  <NuxtLink
    class="moodboard inactive"
    :to="localePath('/inspirations/featured')"
  >
    <div class="wrapper">
      <div class="moodboard-items">
        <div class="placeholder">
          {{ `${$t('board.viewAll')} (${placeholderLength})` }}
        </div>
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
        <figure
          v-for="n in renderPlaceholders"
          :key="n"
          class="moodboard-item empty"
        ></figure>
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

    placeholderLength: {
      type: Number,
      required: false,
    },
  },

  computed: {
    renderPlaceholders() {
      if (!this.moodboard.inspirationItems.length) return 4;
      if (this.moodboard.inspirationItems.length > 3) return 0;
      return 4 - this.moodboard.inspirationItems.length;
    },
  },
};
</script>

<style lang="scss" scoped>
    .moodboard {
      @apply 
        grid
        grid-flow-row-dense
        gap-y-5;

      &:last-child {
        @apply mb-0;
      }

      .wrapper {
        @apply
            w-full
            relative;

        .placeholder {
          @apply
            absolute
            inset-0
            w-full
            z-10
            h-full
            uppercase
            flex
            font-bold
            text-sm
            justify-center
            items-center
            bg-white
            bg-opacity-90;
        }
      }

      .moodboard-items {
        @apply grid
            grid-cols-2
            relative
            grid-rows-2
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
        }

        .empty {
          @apply
            pb-[100%]
            bg-gray-500
            bg-opacity-20;
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