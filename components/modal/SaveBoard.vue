<template>
  <div class="modal">
    <div class="label">
      <span>{{ $t('board.saveConfirm') }}</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="button white"
          @click.native="$root.$emit('modal-add-inspiration', true)"
        >
          <span>Annulla</span>
        </ElementButton>
        <ElementButton
          :focus="true"
          class="button white full"
          @click.native="saveBoard()"
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
    saveBoard() {
      this.$root.$emit("modal-save-board-confirmed", true);
      this.$store.dispatch("moodboards/saveSharedBoard");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>