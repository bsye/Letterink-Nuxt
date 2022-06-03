<template>
  <transition name="inspirations-masonry" mode="out-in">
    <div
      class="inspirations-masonry"
      v-if="inspirations && inspirations.length"
      key="inspirations"
    >
      <div
        class="inspiration"
        v-for="inspiration of inspirations"
        :key="inspiration.id"
      >
        <button @click="$emit('openOverlay', inspiration)">
          <figure>
            <img
              v-if="inspiration.image.length"
              :src="inspiration.image[0].url"
            />

            <div class="add-inspiration-btn">
              <img class="cross" src="~/assets/icons/cross.svg" />
            </div>

            <div class="inspiration-veil">
              <img class="cross" src="~/assets/icons/cross.svg" />
            </div>
          </figure>
        </button>

        <div class="inspiration-info">
          <div class="inspiration-title" v-if="inspiration.title">
            {{ inspiration.title }}
          </div>

          <a
            :href="inspiration.buttonLink.url"
            :target="inspiration.buttonLink.target"
            class="inspiration-url"
            v-if="inspiration.buttonLink"
          >
            {{ inspiration.buttonLink.url }}
          </a>
        </div>
      </div>
    </div>

    <div v-else key="no-inspirations" class="inspirations-not-found">
      No inspirations found
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    inspirations: Array,
  },
};
</script>

<style lang="scss" scoped>
.inspirations-masonry {
  @apply flex
    flex-col
    px-4
      
    md:block
    md:px-5;

  @screen md {
    column-count: auto;
    column-gap: 1.25rem;
    column-width: 18.75rem;
  }

  @screen xl {
    column-width: 25rem;
  }

  .inspiration {
    @apply mb-10
        w-full;

    break-inside: avoid;

    figure {
      @apply w-full
        relative
        cursor-pointer;

      &:hover {
        .add-inspiration-btn {
          @apply opacity-0;
        }

        .inspiration-veil {
          @apply opacity-100;
        }
      }

      img {
        @apply w-full
            object-cover;
      }

      .add-inspiration-btn {
        @apply rounded-full
            bg-black
            w-6
            h-6
            absolute
            top-2
            right-2
            p-1
            transition-opacity;
      }

      .inspiration-veil {
        @apply absolute
            inset-0
            w-full
            h-full
            bg-black
            bg-opacity-70
            flex
            justify-center
            items-center
            opacity-0
            pointer-events-none
            transition-opacity;

        .cross {
          @apply w-1/3;
        }
      }
    }

    .inspiration-info {
      @apply flex
        flex-col
        justify-center
        items-center
        w-full
        uppercase
        font-cabinet-grotesk
        text-sm
        py-5
        gap-y-2;

      .inspiration-url {
        @apply text-gray-primary;
      }
    }
  }
}

.inspirations-not-found {
  @apply w-full
    flex
    justify-center
    items-center
    font-cabinet-grotesk
    uppercase
    text-2xl;
  min-height: 80vh;
}

.inspirations-masonry-enter-active,
.inspirations-masonry-leave-active {
  transition: opacity 0.3s;
}
.inspirations-masonry-enter,
.inspirations-masonry-leave-to {
  opacity: 0;
}
</style>