<template>
  <div class="inspiration">
    <button class="add" @click="addToMoodboard()">
      <figure draggable="false">
        <img v-if="inspiration.image.length" :src="inspiration.image[0].url" />

        <div class="icon">
          <img class="cross" src="~/assets/icons/cross.svg" />
        </div>
      </figure>
    </button>

    <div class="info" v-if="inspiration.title">
      <div class="title" v-if="inspiration.title">
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
      this.$root.$emit("inspiration-image", this.inspiration.image[0].url);
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

  .add {
    @apply w-full flex;

    figure {
      @apply 
        w-full
        relative
        select-none
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
            h-5
            w-5
            md:w-6
            md:h-6
            absolute
            top-2
            right-2
            p-1
            opacity-100
            md:opacity-50
            transition-opacity;
      }
    }
  }

  .url {
    @apply
      text-[10px]
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
        text-xs
        md:text-sm
        pt-2.5
        md:py-5;
  }
}
</style>