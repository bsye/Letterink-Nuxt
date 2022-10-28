<template>
  <transition name="overlay">
    <div class="overlay" v-if="overlayOpen" @click="clickOutside($event)">
      <div class="overlay-content">
        <div class="overlay-header">
          <div class="form-moodboard-header-text">{{ title }}</div>
          <button class="close" @click="handleClose()">
            <img src="~/assets/icons/cross.svg" />
          </button>
        </div>
        <ModalAddInspiration v-if="activeOverlay === 'addInspiration'" />
        <ModalRemoveInspiration v-if="activeOverlay == 'removeInspiration'" />
        <ModalCreateBoard v-if="activeOverlay == 'createBoard'" />
        <ModalCreateBoardOnly v-if="activeOverlay == 'createBoardOnly'" />
        <ModalCreateBoardConfirmed
          v-if="activeOverlay == 'createBoardConfirmed'"
        />
        <ModalGenericError v-if="activeOverlay == 'genericError'" />
        <ModalRenameBoard v-if="activeOverlay == 'renameBoard'" />
        <ModalRenameBoardConfirmed
          v-if="activeOverlay == 'renameBoardConfirmed'"
        />
        <ModalShareBoard v-if="activeOverlay == 'shareBoard'" />
        <ModalShareFeaturedBoard v-if="activeOverlay == 'shareFeaturedBoard'" />
        <ModalShareBoardConfirmed
          v-if="activeOverlay == 'shareBoardConfirmed'"
        />
        <ModalDuplicateBoard v-if="activeOverlay == 'duplicateBoard'" />
        <ModalDuplicateBoardOnly v-if="activeOverlay == 'duplicateBoardOnly'" />
        <ModalDuplicateBoardConfirmed
          v-if="activeOverlay == 'duplicateBoardConfirmed'"
        />
        <ModalSaveBoard v-if="activeOverlay == 'saveBoard'" />
        <ModalSaveBoardConfirmed v-if="activeOverlay == 'saveBoardConfirmed'" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  watch: {
    $route() {
      this.$store.commit("moodboards/SET_ACTIVE_OVERLAY", false);
    },
  },

  mounted() {
    if (process.client) this.$mobileFullScreen();
  },

  computed: {
    ...mapGetters({
      activeOverlay: "moodboards/getActiveOverlay",
    }),
    overlayOpen: function () {
      return this.activeOverlay != false;
    },

    title: function () {
      switch (this.activeOverlay) {
        case "addInspiration":
          return this.$i18n.t("board.addInspiration");
        case "createBoard":
          return this.$i18n.t("board.createNew");
        case "removeInspiration":
          return this.$i18n.t("board.removeInspiration");
        case "createBoardOnly":
          return this.$i18n.t("board.createNew");
        case "createBoardConfirmed":
          return this.$i18n.t("board.createNew");
        case "genericError":
          return this.$i18n.t("board.error");
        case "renameBoard":
          return this.$i18n.t("board.rename");
        case "renameBoardConfirmed":
          return this.$i18n.t("board.rename");
        case "shareBoard":
          return this.$i18n.t("board.share");
        case "shareBoardConfirmed":
          return this.$i18n.t("board.share");
        case "shareFeaturedBoard":
          return this.$i18n.t("board.share");
        case "duplicateBoard":
          return this.$i18n.t("board.duplicate");
        case "duplicateBoardOnly":
          return this.$i18n.t("board.duplicate");
        case "duplicateBoardConfirmed":
          return this.$i18n.t("board.duplicate");
        case "saveBoard":
          return this.$i18n.t("board.save");
        case "saveBoardConfirmed":
          return this.$i18n.t("board.save");
        default:
          break;
      }
    },
  },

  methods: {
    clickOutside(e) {
      if (e.target === this.$el) this.handleClose();
      return false;
    },

    handleClose(e) {
      this.$store.commit("moodboards/SET_ACTIVE_OVERLAY", false);
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
    z-[9999]

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

    height: calc(var(--app-height) - 2.3rem);

    @screen 2xl {
      @apply
        h-auto
        min-h-[440px];
    }
  }

  &::v-deep {
    .modal {
      @apply flex
        flex-col
        grow
        overflow-y-auto
        justify-between
        items-center;

      .label {
        @apply 
            text-2xl
            md:text-28
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
            md:flex-row
            flex-col
            justify-between
            -m-2
            w-auto;

          > * {
            @apply
              m-2
              w-auto
              md:w-full;
          }
        }
      }
    }
  }

  .overlay-header {
    @apply flex
      justify-center
      py-4
      md:py-5
      text-sm
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