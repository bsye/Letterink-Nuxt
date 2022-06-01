<template>
  <transition name="overlay">
    <div class="overlay" v-if="openOverlay" @click="closeOverlay">
      <slot />
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    openOverlay: Boolean,
  },

  methods: {
    closeOverlay(e) {
      if (e.target === this.$el) this.$emit("closeOverlay");
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  @apply fixed
    top-0
    left-0
    w-full
    h-screen
    bg-black
    bg-opacity-20
    flex
    justify-center
    items-center;
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s;
}

.overlay-enter .overlay-leave-to {
  @apply opacity-0;
}
</style>