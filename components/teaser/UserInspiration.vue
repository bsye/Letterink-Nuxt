<template>
  <div class="inspiration">
    <button
      class="remove"
      @click="removeInspiration()"
    >
      <figure>
        <img
          v-if="inspiration.image.length"
          :src="inspiration.image[0].url"
        />

        <div class="icon">
          <img
            class="cross"
            src="~/assets/icons/minus.svg"
          />
        </div>
      </figure>
    </button>

    <div class="info">
      <div
        class="title"
        v-if="inspiration.title"
      >
        {{ inspiration.title }}
      </div>

      <a
        :href="inspiration.buttonLink.url"
        :target="inspiration.buttonLink.target"
        class="url"
        v-if="inspiration.buttonLink"
      >
        {{ inspiration.buttonLink.url }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inspiration: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async removeInspiration() {
      await this.$store.dispatch(
        "moodboards/setCurrentInspiration",
        this.inspiration
      );
      this.$root.$emit("show-overlay", "modal-remove-inspiration");
    },
  },
};
</script>

<style scoped lang="scss">
.inspiration {
  @apply
    w-full;

  break-inside: avoid;

  .remove {
    @apply w-full flex;

    figure {
      @apply w-full
        relative
        cursor-pointer;

      @screen md {
        &:hover {
          .icon {
            @apply
              opacity-100;
          }
        }
      }

      img {
        @apply w-full
            object-cover;
      }

      .icon {
        @apply rounded-full
            bg-black
            w-6
            h-6
            absolute
            top-2
            right-2
            p-1
            opacity-0
            transition-opacity;
      }
    }
  }

  .info {
    @apply flex
        flex-col
        justify-center
        items-center
        w-full
        uppercase
        font-sans
        text-xs
        md:text-sm
        pt-2.5
        md:py-5;

    .url {
      @apply text-gray-primary;
    }
  }
}
</style>