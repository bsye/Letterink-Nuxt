<template>
  <div class="modal">
    <div class="label">
      <span>{{ $t("board.removeInspirationConfirm") }}</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="button white"
          @click.native="$store.commit('moodboards/SET_ACTIVE_OVERLAY', false)"
        >
          <span>{{ $t("board.cancel") }}</span>
        </ElementButton>
        <ElementButton
          :focus="true"
          class="button white full"
          @click.native="removeInspirationFromCurrentBoard()"
          type="submit"
        >
          <span>
            {{ $t("board.confirm") }}
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
      this.$store.commit("moodboards/SET_ACTIVE_OVERLAY", false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>