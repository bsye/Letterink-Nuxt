<template>
  <div class="modal">
    <div class="label">
      {{ $t('board.insertName') }}
      <input
        type="text"
        maxlength="28"
        class="mobile"
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
          class="button white desktop"
          @click.native="$root.$emit('modal-add-inspiration', true)"
        >
          <span>{{ $t('board.cancel') }}</span>
        </ElementButton>
        <ElementButton
          class="button white full"
          :focus="true"
          @click.native="createMoodboard()"
          type="submit"
        >
          <span>
            {{ $t('board.create') }}
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
        this.$root.$emit("show-overlay", "modal-create-board-confirmed");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>