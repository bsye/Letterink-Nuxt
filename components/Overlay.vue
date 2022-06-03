<template>
  <transition name="overlay">
    <div
      class="overlay"
      v-if="openOverlay"
      @closeOverlay="closeOverlay"
      @click="clickOutsideOverlay"
    >
      <div class="overlay-content">
        <div class="overlay-header">
          <div class="form-moodboard-header-text">Aggiungi a moodboard</div>
          <button @click="closeOverlay">
            <img src="~/assets/icons/cross.svg" />
          </button>
        </div>

        <ContentFormMoodboard
          v-if="typeOverlay === 'addInspiration' && moodboards"
          :moodboards="moodboards"
          :inspiration="inspiration"
          @newMoodboard="type = 'createMoodboard'"
        />

        <ContentCreateMoodboard
          @addInspiration="type = 'addInspiration'"
          v-if="typeOverlay === 'createMoodboard'"
        />

        <!-- <slot @closeOverlay="closeOverlay" /> -->
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    openOverlay: Boolean,
    moodboards: Array,
    inspiration: Object,
    overlayType: String,
  },

  data() {
    return {
      type: "",
    };
  },

  methods: {
    clickOutsideOverlay(e) {
      if (e.target === this.$el) this.closeOverlay();
    },

    closeOverlay() {
      console.log("CLOSE");
      this.$emit("closeOverlay");
    },
  },

  computed: {
    typeOverlay() {
      return this.type || this.overlayType;
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

  .overlay-content {
    @apply bg-black
    text-white
    uppercase
    font-cabinet-grotesk
    text-sm
    w-full
    mx-auto;
    max-width: 31rem;
  }

  .overlay-header {
    @apply flex
      justify-center
      py-5
      relative
      border-b
      border-white;

    button {
      @apply absolute
        right-5;

      img {
        @apply transform
        rotate-45;
      }
    }
  }
}

.overlay-enter-active,
.overlay-leave-active {
  transition: opacity 0.3s;
}

.overlay-enter .overlay-leave-to {
  @apply opacity-0;
}
</style>