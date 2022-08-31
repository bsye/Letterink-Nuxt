<template>
  <div class="modal">
    <div class="label">
      <span>Sei sicur* di voler rimuovere l'inspiration?</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="button white"
          @click.native="$root.$emit('hide-overlay', true)"
        >
          <span>Annulla</span>
        </ElementButton>
        <ElementButton
          :focus="true"
          class="button white full"
          @click.native="removeInspirationFromCurrentBoard()"
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
    removeInspirationFromCurrentBoard() {
      this.$store.dispatch("moodboards/removeInspirationFromCurrentBoard");
      this.$root.$emit("hide-overlay", true);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>