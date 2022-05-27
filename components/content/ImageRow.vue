<template>
  <div class="image-row">
    <div
      class="image-row-images"
      v-if="typeImage && row.images && row.images.length"
    >
      <figure
        :class="`horizontal-alignment-${image.horizontalAlignment}`"
        v-for="image of row.images"
        :key="image.id"
      >
        <img
          :class="[
            `width-${image.width}`,
            `vertical-alignment-${image.verticalAlignment}`,
          ]"
          v-if="image.image[0]"
          :src="image.image[0].url"
        />
      </figure>
    </div>

    <div
      class="image-row-text"
      :class="row.maxWidth"
      v-if="typeText && row.textContent"
      v-html="row.textContent"
    ></div>

    <div
      class="image-row-spacer"
      :class="row.spacer"
      v-if="typeSpacer && row.spacer"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    row: Object,
  },

//   asyncData({ params }) {},

  computed: {
    typeText() {
      return this.row.__typename === "projectBlocks_text_BlockType";
    },

    typeSpacer() {
      return this.row.__typename === "projectBlocks_spacer_BlockType";
    },

    typeImage() {
      return this.row.__typename === "projectBlocks_imageColumns_BlockType";
    },
  },
};
</script>

<style lang="scss" scoped>
.image-row {
  .image-row-images {
    @apply flex
        flex-col
        gap-y-4
        
        md:flex-row
        md:gap-x-5;

    figure {
      @apply w-full
        flex
        justify-center;

      &.horizontal-alignment-left {
        @apply justify-start;
      }

      &.horizontal-alignment-right {
        @apply justify-end;
      }

      img {
        @apply w-full
            object-cover
            self-center;

        &.width-small {
          @apply md:w-2/3;
        }

        &.vertical-alignment-top {
          @apply self-start;
        }

        &.vertical-alignment-bottom {
          @apply self-end;
        }
      }
    }
  }

  .image-row-spacer {
    @apply w-full;

    &.small {
      @apply h-4
            md:h-10;
    }

    &.medium {
      @apply h-4
            md:h-20;
    }

    &.big {
      @apply h-8
            md:h-40;
    }
  }
}
</style>