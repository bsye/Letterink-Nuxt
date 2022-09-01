<template>
  <div class="inspiration">
    <button @click="addToMoodboard()">
      <figure draggable="false">
        <img
          v-if="inspiration.image.length"
          :src="inspiration.image[0].url"
        />

        <div class="icon">
          <img
            class="cross"
            src="~/assets/icons/cross.svg"
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
    addToMoodboard() {
      this.$root.$emit("show-overlay", "modal-add-inspiration");
      this.$store.dispatch(
        "moodboards/setCurrentInspiration",
        this.inspiration
      );
    },
  },
};
</script>

<style scoped lang="scss">
.inspiration {
  @apply
    select-none
    w-full;

  break-inside: avoid;

  button {
    @apply w-full;

    figure {
      @apply w-full
        relative
        select-none
        cursor-pointer;

      &:hover {
        .inspiration-veil {
          @apply opacity-100;
        }

        .icon {
          @apply
            opacity-100;
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

  .url {
    @apply
      text-xs
      break-words
      break-all
      mt-0.5
      opacity-30
      text-center
      md:text-sm;
  }

  .info {
    @apply flex
        flex-col
        justify-center
        items-center
        w-full
        uppercase
        font-sans
        text-sm
        pt-2
        md:py-5;
  }
}
</style>