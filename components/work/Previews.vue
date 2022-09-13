<template>
  <div
    class="images"
    :class="[ previewType, { 'active' : active} ]"
  >
    <figure
      v-for="preview of previews"
      :key="preview.id"
    >
      <img :src="preview.url" />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    previewType: {
      type: String,
    },

    previews: {
      type: Array,
    },

    active: {
      type: Boolean,
    },
  },
};
</script>

<style scoped lang="scss">
.images {
  @apply 
    absolute
    pointer-events-none
    right-0
    md:left-0
    mx-auto
    overflow-hidden
    opacity-0
    transition-opacity
    w-screen;

  top: 3.375rem;
  bottom: 3.375rem;
  max-width: 72rem;

  &.active {
    @apply
      opacity-100
  }

  @screen md {
    height: calc(100vh - 3.375rem);
  }

  figure {
    @apply absolute;

    img {
      @apply w-full
        object-cover
        absolute;
    }
  }

  &.layout1 {
    figure {
      &:nth-child(1) {
        @apply
          pb-[64.5%]
          w-[90%]
          z-10

          md:w-[70%]
          md:pb-[45%];
      }

      &:nth-child(2) {
        @apply bottom-[3.375rem]
        z-10
        right-0
        pb-[67%]
        w-1/2

        md:right-[7.5rem]
        md:w-[29%]
        md:pb-[40%];
      }

      &:nth-child(3) {
        @apply bottom-0
          left-0
          pb-[62%]
          w-1/2;
      }
    }
  }

  &.layout2 {
    figure {
      &:nth-child(1) {
        @apply right-0
        z-10
        top-[25%]
        w-[60%]
        pb-[112.16%]

        md:top-0
        md:w-2/5;
      }

      &:nth-child(2) {
        @apply
          left-[10%]
          pb-[86.8%]
          w-[35%]
          z-[100]

          md:w-[30%]
      }

      &:nth-child(3) {
        @apply top-full
          transform
          z-10;
      }
    }
  }
}
</style>