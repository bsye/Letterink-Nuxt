<template>
  <div class="moodboard">
    <div class="moodboard-label">
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
.moodboard {
  @apply flex
    flex-col
    grow
    justify-between
    items-center;

  .moodboard-label {
    @apply text-28
        font-sans
        text-center
        py-16
        px-20;
    line-height: initial;
  }

  form {
    @apply flex
        flex-col
        w-full
        px-5
        pb-5
        gap-y-5;

    input {
      @apply border
        border-white
        text-sm
        text-white
        bg-black
        outline-none
        p-4
        uppercase;
    }

    button {
      @apply
        w-full;
    }

    .form-actions {
      @apply flex
        justify-between
        gap-x-4;
    }
  }
}
</style>