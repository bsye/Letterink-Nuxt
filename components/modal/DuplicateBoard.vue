<template>
  <div class="create-moodboard">
    <div class="create-moodboard-label">
      <span>Sei sicur* di voler duplicare la board?</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="button white"
          :inactive="true"
          @click.native="$root.$emit('modal-add-inspiration', true)"
        >
          <span>Annulla</span>
        </ElementButton>
        <ElementButton
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
      this.$store.dispatch("moodboards/duplicateBoard");
    },
  },
};
</script>

<style lang="scss" scoped>
.create-moodboard {
  @apply flex
    flex-col
    grow
    justify-between
    items-center;

  .create-moodboard-label {
    @apply text-28
        font-cabinet-grotesk
        text-center
        grow
        flex
        justify-center
        items-center
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

    button,
    div {
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