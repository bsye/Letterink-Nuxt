<template>
  <div class="modal">
    <div class="label">
      <span>Salvare la moodboard nella tua collezione?</span>
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
          @click.native="duplicateBoard()"
          type="submit"
        >
          <span>
            Conferma
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
      this.$root.$emit("modal-save-board-confirmed", true);
      this.$store.dispatch("moodboards/duplicateBoard");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>