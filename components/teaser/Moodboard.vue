<template>
  <NuxtLink
    class="moodboard"
    :class="{ 'inactive': placeholder}"
    :to="url"
  >
    <div class="wrapper">
      <div
        v-if="placeholder"
        class="placeholder"
      >
        {{ `${$t('view.all')} (${placeholderLength})` }}
      </div>
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
        <figure class="moodboard-item empty"></figure>
        <figure class="moodboard-item empty"></figure>
        <figure class="moodboard-item empty"></figure>
        <figure class="moodboard-item empty"></figure>
      </div>
    </div>

    <div
      v-if="!placeholder"
      class="moodboard-info"
    >
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

    placeholder: {
      type: Boolean,
      required: false,
    },

    placeholderLength: {
      type: Number,
      required: false,
    },
  },

  computed: {
    url() {
      if (this.placeholder) return "/inspiration";
      return this.localePath({
        name: "inspirations-slug",
        params: { slug: this.moodboard.slug },
      });
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

      .wrapper {
        @apply
            w-[13.5rem]
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

          &:nth-child(n + 5) {
            @apply hidden;
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