<template>
  <div class="actions">
    <div class="counter">
      {{ length }} {{ $t('board.images') }}
    </div>

    <div class="wrapper">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
  .actions {
    @apply
        p-4
        md:p-5
        text-sm
        w-full
        flex
        justify-center
        border-t
        border-black

        md:border-none
        md:justify-between;

    .counter {
      @apply text-gray-primary
          hidden
          uppercase
          
          md:flex;
    }

    .wrapper {
      @apply
        grid
        grid-flow-col
        gap-x-5;

      &::v-deep {
        button {
          @apply uppercase
              font-sans
              underline;
          text-underline-position: under;
  
          &:hover {
            @apply md:no-underline;
          }
        }
      }
    }
  }
</style>