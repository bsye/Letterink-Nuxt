<template>
  <div class="modal">
    <div class="label">
      Inserisci il nuovo nome della board?
    </div>

    <form @submit.prevent="">
      <input
        type="text"
        maxlength="28"
        v-model="moodboardName"
      />
      <div class="form-actions">
        <ElementButton
          class="button white full"
          @click.native="renameMoodboard()"
          type="submit"
        >
          <span>
            Rinomina
          </span>
        </ElementButton>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moodboardName: "",
    };
  },

  methods: {
    renameMoodboard() {
      if (this.moodboardName) {
        this.$store.dispatch("moodboards/renameMoodboard", this.moodboardName);
        this.$root.$emit("show-overlay", "modal-rename-board-confirmed");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>