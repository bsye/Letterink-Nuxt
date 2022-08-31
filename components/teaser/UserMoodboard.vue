<template>
  <NuxtLink
    class="moodboard"
    :to="localePath({
        name: 'inspirations-user-id',
        params: { id: this.moodboard.id },
      })"
  >
    <div class="wrapper">
      <div class="items">
        <template v-if="moodboard.inspirationItems">
          <template v-for="(item, index) of moodboard.inspirationItems">
            <figure
              :key="index"
              v-if="index < 4"
              class="item"
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
          class="item empty"
        ></figure>
      </div>
    </div>

    <div class="info">
      <div
        class="title"
        v-if="moodboard.title"
      >
        {{ moodboard.title }}
      </div>

      <div class="counter">
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
        gap-y-4
        md:gap-y-5;

      &:last-child {
        @apply mb-0;
      }

      .items {
        @apply grid
            grid-cols-2
            relative
            grid-rows-2
            gap-[3px]
            md:gap-1;

        .item {
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

      .info {
        @apply flex
            flex-col
            justify-center
            items-center
            gap-y-1
            uppercase
            text-xs
            md:text-sm
            font-sans;

        .title {
          @apply
            leading-none
            text-center;
        }

        .counter {
          @apply text-gray-primary;
        }
      }
    }
</style>