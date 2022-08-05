<template>
  <transition
    name="inspirations-masonry"
    mode="out-in"
  >
    <div
      class="inspirations-masonry"
      v-if="inspirations && inspirations.length"
      key="inspirations"
    >
      <TeaserInspiration
        v-for="inspiration of inspirations"
        :key="inspiration.id"
        :inspiration="inspiration"
      />
    </div>

    <div
      v-else
      key="no-inspirations"
      class="inspirations-not-found"
    >
      No inspirations found
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    inspirations: Array,
  },
};
</script>

<style lang="scss" scoped>
.inspirations-masonry {
  @apply flex
    flex-col
    px-4
      
    md:block
    md:px-5;

  @screen md {
    column-count: auto;
    column-gap: 1.25rem;
    column-width: 18.75rem;
  }

  @screen xl {
    column-width: 25rem;
  }
}

.inspirations-not-found {
  @apply w-full
    flex
    justify-center
    items-center
    font-cabinet-grotesk
    uppercase
    text-2xl;

  min-height: 40vh;

  @screen md {
    min-height: 80vh;
  }
}

.inspirations-masonry-enter-active,
.inspirations-masonry-leave-active {
  transition: opacity 0.3s;
}
.inspirations-masonry-enter,
.inspirations-masonry-leave-to {
  opacity: 0;
}
</style>