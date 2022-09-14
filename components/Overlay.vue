<template>
  <transition name="overlay">
    <div
      class="overlay"
      v-if="overlayOpen"
      @click="clickOutside($event)"
    >
      <div class="overlay-content">
        <div class="overlay-header">
          <div class="form-moodboard-header-text">{{ title }}</div>
          <button
            class="close"
            @click="handleClose()"
          >
            <img src="~/assets/icons/cross.svg" />
          </button>
        </div>

        <ModalAddInspiration v-if="modals.addInspiration" />
        <ModalRemoveInspiration v-if="modals.removeInspiration" />
        <ModalCreateBoard v-if="modals.createBoard" />
        <ModalCreateBoardOnly v-if="modals.createBoardOnly" />
        <ModalCreateBoardConfirmed v-if="modals.createBoardConfirmed" />
        <ModalRenameBoard v-if="modals.renameBoard" />
        <ModalRenameBoardConfirmed v-if="modals.renameBoardConfirmed" />
        <ModalShareBoard v-if="modals.shareBoard" />
        <ModalShareFeaturedBoard v-if="modals.shareFeaturedBoard" />
        <ModalDuplicateBoard v-if="modals.duplicateBoard" />
        <ModalDuplicateBoardOnly v-if="modals.duplicateBoardOnly" />
        <ModalDuplicateBoardConfirmed v-if="modals.duplicateBoardConfirmed" />
        <ModalSaveBoard v-if="modals.saveBoard" />
        <ModalSaveBoardConfirmed v-if="modals.saveBoardConfirmed" />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      overlayOpen: false,
      title: false,
      modals: {
        addInspiration: false,
        removeInspiration: false,
        createBoard: false,
        createBoardOnly: false,
        createBoardConfirmed: false,
        renameBoard: false,
        renameBoardConfirmed: false,
        shareBoard: false,
        shareFeaturedBoard: false,
        duplicateBoard: false,
        duplicateBoardOnly: false,
        duplicateBoardConfirmed: false,
        saveBoard: false,
        saveBoardConfirmed: false,
      },
    };
  },

  watch: {
    $route() {
      this.$root.$emit("hide-overlay", true);
    },
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
      this.title = this.$i18n.t("board.addInspiration");
      this.modals.addInspiration = state;
    });

    this.$root.$on("modal-remove-inspiration", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.removeInspiration");
      this.modals.removeInspiration = state;
    });

    this.$root.$on("modal-duplicate-board", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.duplicate");
      this.modals.duplicateBoard = state;
    });

    this.$root.$on("modal-duplicate-board-only", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.duplicate");
      this.modals.duplicateBoardOnly = state;
    });

    this.$root.$on("modal-duplicate-board-confirmed", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.duplicate");
      this.modals.duplicateBoardConfirmed = state;
    });

    this.$root.$on("modal-save-board", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("Salva");
      this.modals.saveBoard = state;
    });

    this.$root.$on("modal-save-board-confirmed", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.duplicate");
      this.modals.saveBoardConfirmed = state;
    });

    this.$root.$on("modal-create-board", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.createNew");
      this.modals.createBoard = state;
    });

    this.$root.$on("modal-create-board-only", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.createNew");
      this.modals.createBoardOnly = state;
    });

    this.$root.$on("modal-create-board-confirmed", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.createNew");
      this.modals.createBoardConfirmed = state;
    });

    this.$root.$on("modal-rename-board", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.rename");
      this.modals.renameBoard = state;
    });

    this.$root.$on("modal-rename-board-confirmed", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.rename");
      this.modals.renameBoardConfirmed = state;
    });

    this.$root.$on("modal-share-board", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.share");
      this.modals.shareBoard = state;
    });
    this.$root.$on("modal-share-featured-board", (state) => {
      this.closeModals();
      this.title = this.$i18n.t("board.share");
      this.modals.shareFeaturedBoard = state;
    });

    if (process.client) this.$mobileFullScreen();
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
    bottom-0
    w-full
    bg-black
    border-none
    h-screen
    bg-opacity-70
    flex
    justify-center
    items-start

    md:items-center;

  .overlay-content {
    @apply
    bg-black
    text-white

    flex
    flex-col

    uppercase
    font-sans
    text-xs
    transition-all
    md:text-sm

    mx-auto

    border
    border-white

    w-[calc(100vw_-_2rem)]
    max-w-[31rem]

    overflow-y-auto
    overflow-x-hidden

    mt-5

    md:w-[calc(100vw_-_2.5rem)];

    min-height: calc(var(--app-height) - 2.3rem);

    @screen md {
      @apply
        min-h-[410px];
    }
  }

  &::v-deep {
    .modal {
      @apply flex
        flex-col
        grow
        justify-between
        items-center;

      .label {
        @apply text-28
            font-sans
            text-center
            flex-col
            flex
            grow
            justify-center
            items-center
            py-16
            px-4
            md:px-20;
        line-height: initial;

        input {
          @apply border
            border-white
            text-sm
            text-white
            bg-black
            mt-6
            w-full
            rounded-none
            outline-none
            p-4
            uppercase;
        }
      }
  
      form {
        @apply flex
            flex-col
            w-full
            px-4
            md:px-5
            pb-4
            md:pb-5
            gap-y-4
            md:gap-y-5;

        input {
          @apply border
            border-white
            text-sm
            text-white
            bg-black
            mt-6
            w-full
            rounded-none
            outline-none
            p-4
            uppercase;
        }
  
        button,
        div {
          @apply
            w-full;
        }
  
        .form-actions {
          @apply flex
            justify-between
            gap-x-4;
        }
      }
    }
  }

  .overlay-header {
    @apply flex
      justify-center
      py-4
      md:py-5
      relative
      border-b
      border-white;

    button {
      @apply absolute
        right-4
        md:right-5;

      img {
        @apply transform
        rotate-45;
      }
    }
  }

  .close {
    @apply
      -m-5
      p-5;
  }
}

.overlay-enter-active,
.overlay-leave-active {
  @apply
    transition-opacity;
}

.overlay-enter,
.overlay-leave-to {
  @apply opacity-0;
}
</style>