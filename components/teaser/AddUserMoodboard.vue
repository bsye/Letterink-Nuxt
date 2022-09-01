<template>
  <button
    @click="$root.$emit('show-overlay', 'modal-create-board-only')"
    class="moodboard inactive"
  >
    <div class="wrapper">
      <div class="placeholder">
        {{ $t('add.moodboard') }}
      </div>
      <div class="moodboard-items">
        <figure
          v-for="n in 4"
          :key="n"
          class="moodboard-item empty"
        ></figure>
      </div>
    </div>

  </button>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
    .moodboard {
      @apply 
        grid
        grid-flow-row-dense
        gap-y-5;

      &:last-child {
        @apply mb-0;
      }

      .wrapper {
        @apply
            w-full
            z-0
            relative;

        .placeholder {
          @apply
            absolute
            inset-0
            w-full
            z-10
            h-full
            uppercase
            flex
            justify-center
            font-bold
            text-sm
            items-center
            bg-black
            bg-opacity-40;
        }
      }

      .moodboard-items {
        @apply grid
            grid-cols-2
            relative
            grid-rows-2
            gap-1;

        .moodboard-item {
          @apply 
            w-full
            pb-[100%]
            relative;

          img {
            @apply w-full
                h-full
                object-cover
                absolute;
          }
        }

        .empty {
          @apply
            pb-[100%]
            bg-gray-500
            bg-opacity-20;
        }
      }

      .moodboard-info {
        @apply flex
            flex-col
            justify-center
            items-center
            gap-y-1
            uppercase
            text-sm
            font-sans;

        .moodboard-counter {
          @apply text-gray-primary;
        }
      }
    }
</style>