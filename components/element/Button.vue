<template>
  <button v-if="!inactive">
    <slot />
  </button>
  <div v-else>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    inactive: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
button.button,
div.button {
  @apply
    cursor-pointer
    inline-block
    uppercase
    font-cabinet-grotesk
    w-auto
    justify-center
    items-center
    py-4
    min-h-[54px]
    border-black
    text-black
    px-6
    text-sm
    border
    transition-colors
    hover:bg-black
    hover:text-white;

  > * {
    @apply
      flex
      leading-normal
      justify-center
      items-center;

    > :last-child {
      @apply
        ml-3;
    }
  }

  &:hover {
    .icon {
      @apply
        invert;
    }
  }

  .icon {
    @apply
      rounded-full
      bg-black
      w-5
      h-5
      top-2
      right-2
      p-1
      transition-all;

    img {
      @apply
        h-3
        w-3;
    }
  }

  &.white {
    @apply
      border-white
      text-white

      hover:bg-white
      hover:text-black;

    .icon {
      @apply
        bg-white;
    }

    &:hover {
      .icon {
        @apply
          invert;
      }
    }

    &.full {
      @apply
        bg-white
        text-black
        
        hover:bg-black
        hover:border-white
        hover:text-white;
    }
  }
}
</style>