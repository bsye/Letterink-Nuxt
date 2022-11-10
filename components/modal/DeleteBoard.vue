<template>
  <div class="modal">
    <div class="label">
      <span>{{ $t("board.deleteBoard") }}</span>
    </div>

    <div class="form-actions">
      <ElementButton
        class="button white full"
        :focus="true"
        @click.native="deleteBoard()"
        type="submit"
      >
        <span>
          {{ $t("board.confirm") }}
        </span>
      </ElementButton>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    deleteBoard() {
      this.$store.dispatch("moodboards/deleteMoodboard");
      this.$store.commit("moodboards/SET_ACTIVE_OVERLAY", false);
      let toast = this.$toasted.show("Deleted", {
        theme: "toasted-primary",
        position: "bottom-right",
        duration: 5000,
      });
      this.$router.push("/inspirations");
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