<template>
  <section
    class="moodboards"
    v-if="getFeatured"
  >
    <div class="moodboards-label">
      <span> Editorial Moodboard </span>
    </div>

    <div
      class="moodboards-content"
      :class="'in-your-moodboards'"
    >
      <template v-for="moodboard of getFeatured">
        <TeaserMoodboard
          :key="moodboard.id"
          :moodboard="moodboard"
        />
      </template>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("moodboards", ["getFeatured"]),
  },
};
</script>

<style lang="scss" scoped>
.moodboards {
  @apply pb-16
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