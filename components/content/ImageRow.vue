<template>
  <div class="image-row">
    <div
      class="image-row-images"
      v-if="isMedia"
    >
      <template v-for="media in content.workMedia">
        <figure
          :class="$get(media, 'horizontalAlignment')"
          v-if="media.typeHandle == 'image'"
          :key="media.id"
        >
          <img
            :class="[
            $get(media, 'width'),
            $get(media, 'verticalAlignment'),
          ]"
            :src="$get(media,'image[0].url')"
          />
        </figure>
        <TeaserInspiration
          :class="[
            $get(media, 'width'),
            $get(media, 'verticalAlignment'),
            $get(media, 'horizontalAlignment')
          ]"
          :key="media.id"
          :inspiration="$get(media, 'inspiration[0]')"
          v-else
        />
      </template>
    </div>

    <div
      class="text"
      :class="content.maxWidth"
      v-if="isText"
      v-html="content.textContent"
    ></div>

    <div
      class="spacer"
      :class="content.spacerValue"
      v-if="isSpacer"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    content: Object,
  },

  computed: {
    isText() {
      return this.content.typeHandle === "textContent";
    },

    isSpacer() {
      return this.content.typeHandle === "spacer";
    },

    isMedia() {
      return this.content.typeHandle === "mediaContent";
    },
  },
};
</script>

<style lang="scss" scoped>
.image-row {
  @apply
    mx-4
    md:mb-10
    md:mx-2.5;

  .image-row-images {
    @apply flex
        flex-col
        
        md:flex-row;

    > * {
      @apply
        md:mx-2.5
        md:my-0
        inline-block
        my-2.5
    }

    .inspiration {
      &.width-small {
        @apply md:w-2/3;
      }
    }

    figure,
    .inspiration {
      @apply w-full
        flex
        justify-center;

      &.horizontal-left {
        @apply justify-start;
      }

      &.horizontal-center {
        @apply justify-center mx-auto;
      }

      &.horizontal-right {
        @apply justify-end;
      }

      &.vertical-top {
        @apply self-start;
      }

      &.vertical-center {
        @apply self-center;
      }

      &.vertical-bottom {
        @apply self-end;
      }

      img {
        @apply w-full
            object-cover
            self-center;

        &.width-small {
          @apply md:w-2/3;
        }

        &.vertical-top {
          @apply self-start;
        }

        &.vertical-center {
          @apply self-center;
        }

        &.vertical-bottom {
          @apply self-end;
        }
      }
    }
  }

  .text {
    @apply
      md:mx-2.5
      my-3
      text-sm
      md:text-base
      inline-block
      uppercase;

    &.width-medium {
      @apply
        max-w-4xl;
    }

    &.width-small {
      @apply
        max-w-xl;
    }
  }

  .spacer {
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