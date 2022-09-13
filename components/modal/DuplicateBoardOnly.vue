<template>
  <div class="modal">
    <div class="label">
      <span>{{ $t('board.duplicateBoardConfirm') }}</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="button white full"
          :focus="true"
          @click.native="duplicateBoard()"
          type="submit"
        >
          <span>
            {{ $t('board.confirm') }}
          </span>
        </ElementButton>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    duplicateBoard() {
      this.$root.$emit("modal-duplicate-board-confirmed", true);
      this.$store.dispatch("moodboards/duplicateBoard");
    },
  },
};
</script>

<style lang="scss" scoped>
.overlay {
  .modal {
    .label {
      @apply
        justify-center;
    }
  }
}
</style>