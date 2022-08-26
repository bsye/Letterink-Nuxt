<template>
  <div class="inspirations">
    <template v-for="(moodboard) of getUserMoodboards">
      <TeaserUserMoodboard
        class="swiper-slide"
        :key="moodboard.id"
        :moodboard="moodboard"
      />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  head() {
    return {
      htmlAttrs: {
        class: `dark`,
      },
    };
  },

  computed: {
    ...mapGetters("moodboards", ["getUserMoodboards"]),
  },
};
</script>

<style lang="scss" scoped>
.inspirations {
  @apply
    mt-5
    grid
    px-5
    grid-cols-2
    md:grid-cols-2
    justify-start
    w-full
    lg:grid-cols-4
    xl:grid-cols-6
    2xl:grid-cols-8
    gap-5;

  .moodboard {
    @apply
      w-full;
  }
}
</style>
