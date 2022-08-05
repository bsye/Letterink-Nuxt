<template>
  <transition name="overlay">
    <div
      class="overlay"
      v-if="overlayOpen"
      @click="clickOutside($event)"
    >
      <div class="overlay-content">
        <div class="overlay-header">
          <div class="form-moodboard-header-text">Aggiungi a moodboard</div>
          <button @click="handleClose()">
            <img src="~/assets/icons/cross.svg" />
          </button>
        </div>

        <ModalAddInspiration v-if="modals.addInspiration" />
        <ModalCreateBoard v-if="modals.createBoard" />
        <ModalCreateBoardOnly v-if="modals.createBoardOnly" />
        <ModalShareBoard v-if="modals.shareBoard" />
        <ModalDuplicateBoard v-if="modals.duplicateBoard" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      overlayOpen: false,
      modals: {
        addInspiration: false,
        createBoard: false,
        createBoardOnly: false,
        shareBoard: false,
        duplicateBoard: false,
      },
    };
  },

  mounted() {
    this.$root.$on("show-overlay", (state) => {
      if (state) this.overlayOpen = state;
      this.$root.$emit(state, true);
    });

    this.$root.$on("hide-overlay", (state) => {
      this.overlayOpen = false;
      this.closeModals();
    });

    this.$root.$on("modal-add-inspiration", (state) => {
      this.closeModals();
      this.modals.addInspiration = state;
    });

    this.$root.$on("modal-duplicate-board", (state) => {
      this.closeModals();
      this.modals.duplicateBoard = state;
    });

    this.$root.$on("modal-create-board", (state) => {
      this.closeModals();
      this.modals.createBoard = state;
    });

    this.$root.$on("modal-share-board", (state) => {
      console.log("su");
      this.closeModals();
      this.modals.shareBoard = state;
    });

    this.$root.$on("modal-create-board-only", (state) => {
      this.closeModals();
      this.modals.createBoardOnly = state;
    });
  },

  methods: {
    clickOutside(e) {
      if (e.target === this.$el) this.handleClose();
      return false;
    },

    closeModals() {
      Object.keys(this.modals).forEach((key) => {
        this.modals[key] = false;
      });
    },

    handleClose(e) {
      this.closeModals();
      this.overlayOpen = false;
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
    flex
    flex-col
    font-cabinet-grotesk
    text-sm
    w-full
    mx-auto
    max-w-[31rem]
    min-h-[410px];
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