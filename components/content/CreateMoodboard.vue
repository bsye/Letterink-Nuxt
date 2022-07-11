<template>
  <div class="create-moodboard">
    <div class="create-moodboard-label">
      Inserisci il nuovo nome della board?
    </div>

    <form @submit.prevent="">
      <input type="text" v-model="moodboardName" />
      <div class="form-actions">
        <button @click.prevent="$emit('addInspiration')">Annulla</button>
        <button class="create-moodboard-btn" type="submit">Crea</button>
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
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.create-moodboard {
  @apply flex
    flex-col
    justify-center
    items-center;

  .create-moodboard-label {
    @apply text-28
        font-cabinet-grotesk
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

    .form-actions {
      @apply flex
        justify-between
        gap-x-5;

      button {
        @apply w-full
            text-sm
            uppercase
            font-cabinet-grotesk
            border
            border-white
            py-4;

        &.create-moodboard-btn {
          @apply text-black
            bg-white;
        }
      }
    }
  }
}
</style>