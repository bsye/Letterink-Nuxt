<template>
  <div class="modal">
    <div class="label">
      {{ $t("board.insertName") }}
      <input
        type="text"
        class="mobile"
        maxlength="28"
        v-model="moodboardName"
      />
    </div>

    <form @submit.prevent="">
      <input
        type="text"
        maxlength="28"
        class="desktop"
        v-model="moodboardName"
      />
      <div class="form-actions">
        <ElementButton
          class="button white full"
          @click.native="createMoodboard()"
          type="submit"
        >
          <span>
            {{ $t("board.create") }}
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
    createMoodboard() {
      if (this.moodboardName) {
        this.$store.dispatch("moodboards/createMoodboard", this.moodboardName);
        this.$store.commit(
          "moodboards/SET_ACTIVE_OVERLAY",
          "createBoardConfirmed"
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>