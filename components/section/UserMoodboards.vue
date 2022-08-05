<template>
  <section
    class="moodboards"
    v-if="getUserMoodboards"
  >
    <div class="moodboards-label">
      <span> Your Moodboards </span>
    </div>

    <div
      class="moodboards-content"
      :class="'in-your-moodboards'"
    >
      <template v-for="moodboard of getUserMoodboards">
        <TeaserMoodboard
          :key="moodboard.id"
          :moodboard="moodboard"
        />
      </template>
    </div>
  </section>
  <section
    class="moodboards"
    v-else
  >
    <ElementButton
      class="button"
      @click.native="$root.$emit('show-overlay', 'modal-create-board-only')"
    >
      <div>
        <span> Crea la tua prima Moodboard </span>
        <div class="icon">
          <img
            class="cross"
            src="~/assets/icons/cross.svg"
          />
        </div>
      </div>
    </ElementButton>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("moodboards", ["getUserMoodboards"]),
  },
};
</script>

<style lang="scss" scoped>
.moodboards {
  @apply pb-16
    text-center
    overflow-hidden;

  .moodboards-label {
    @apply uppercase
      text-sm
      font-cabinet-grotesk
      w-full
      text-center
      py-5;
  }

  .moodboards-content {
    @apply flex
      -mx-8
      overflow-auto
      justify-center
      relative;

    &::-webkit-scrollbar {
      @apply hidden;
    }

    .moodboard {
      @apply
        px-4;
    }
  }
}
</style>