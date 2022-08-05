<template>
  <div class="create-moodboard">
    <div class="create-moodboard-label">
      Condividi
      <span>
        {{ `'${getCurrentMoodboard.title}'` }}
      </span>
    </div>

    <div class="buttons">
      <ElementButton
        @click.native="generateShare()"
        class="button white"
      >
        Copia Link
      </ElementButton>
      <ElementButton class="button white">
        Facebook
      </ElementButton>
      <ElementButton class="button white">
        Linkedin
      </ElementButton>
      <ElementButton class="button white">
        Pinterest
      </ElementButton>
      <ElementButton class="button white">
        Whatsapp
      </ElementButton>
      <div class="warning">
        <span>
          (*) Stai condividendo la versione corrente della tua Board, se effettuerai modifiche a "matrimonio in campagna" in futuro non verranno visualizzate sul link generato.
        </span>
      </div>
    </div>
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
    ...mapGetters("moodboards", ["getCurrentMoodboard"]),
  },

  methods: {
    generateShare() {
      const generated = this.$store.dispatch("moodboards/generateShare");
      console.log(generated);
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
        py-16
        px-20;
    line-height: initial;
  }

  .warning {
    @apply
      text-[10px]
      leading-snug
      py-8
      text-center;
  }

  .buttons {
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