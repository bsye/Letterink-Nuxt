<template>
  <div class="modal">
    <div class="label">
      {{ $t("board.insertName") }}
      <input
        type="text"
        maxlength="28"
        class="mobile"
        v-model="moodboardName"
      />
    </div>

    <form @submit.prevent="createMoodboard">
      <input
        type="text"
        maxlength="28"
        class="desktop"
        v-model="moodboardName"
      />
      <div class="form-actions">
        <ElementButton
          class="button white desktop"
          @click.native="
            $store.commit('moodboards/SET_ACTIVE_OVERLAY', 'addInspiration')
          "
        >
          <span>{{ $t("board.cancel") }}</span>
        </ElementButton>
        <ElementButton class="button white full" :focus="true" type="submit">
          <span>
            {{ $t("board.create") }}
          </span>
        </ElementButton>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      moodboardName: "",
    };
  },

  computed: {
    ...mapGetters({
      currentMoodboard: "moodboards/getCurrentMoodboard",
    }),
  },

  methods: {
    createMoodboard() {
      if (this.moodboardName) {
        this.$store.dispatch("moodboards/createMoodboard", this.moodboardName);
        this.$store.dispatch(
          "moodboards/addToMoodboards",
          this.currentMoodboard
        );
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
div.overlay {
  div.modal {
    div.form-actions {
      @apply
        flex-col-reverse
        md:flex-row;
    }
  }
}
</style>