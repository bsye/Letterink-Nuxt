<template>
  <div class="inspirations">
    <SectionUserMoodboards />
  </div>
</template>

<script>
export default {
  head() {
    return {
      htmlAttrs: {
        class: `dark`,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.inspirations {
  .inspirations-container {
    @apply border-t
      border-black;

    .inspirations-filters {
      @apply flex
        justify-between
        w-full
        px-4
        py-5
        uppercase
        
        md:px-5;

      .filters {
        @apply flex
          gap-x-5;

        .inspirations-filters-categories {
          @apply relative;

          .inspirations-categories-label {
            @apply flex
              justify-center
              items-center
              gap-x-2
              uppercase;

            span {
              @apply underline;
              text-underline-position: under;
            }

            img {
              @apply transition-transform;

              &.open {
                @apply transform
                rotate-180;
              }
            }
          }

          .inspirations-categories {
            @apply flex
              flex-col
              absolute
              w-max
              top-6
              px-2
              py-1
              z-10
              bg-white;

            &.colors {
              @apply w-max
                right-0;
            }

            .inspirations-category {
              @apply flex
                uppercase
                text-left
                transition-colors;

              &:hover,
              &.selected-category {
                @apply text-gray-primary;
              }
            }
          }
        }
      }
    }
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}
</style>
