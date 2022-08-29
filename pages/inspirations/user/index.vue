<template>
  <div class="user">
    <SectionPageHeader
      :back="localePath('inspirations')"
      :section="$t('User moodboards')"
    />
    <div class="inspirations">
      <TeaserAddMoodboard />
      <template v-for="(moodboard) of getUserMoodboards">
        <TeaserUserMoodboard
          class="swiper-slide"
          :key="moodboard.id"
          :moodboard="moodboard"
        />
      </template>
    </div>
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
.user {
  .inspirations {
    @apply
      mt-5
      px-5
      grid
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
}
</style>
