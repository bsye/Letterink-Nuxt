<template>
  <div class="featured">
    <SectionPageHeader
      class="title"
      :back="localePath('inspirations')"
      :section="$t('Inspirational moodboards')"
    />
    <div class="inspirations">
      <template v-for="(moodboard) of getFeatured">
        <TeaserFeaturedMoodboard
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
  computed: {
    ...mapGetters("moodboards", ["getFeatured"]),
  },
};
</script>

<style lang="scss" scoped>
.featured {
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

  .title {
    &::v-deep {
      img {
        @apply
          rotate-180;

        filter: invert(1);
      }
    }
  }
}
</style>
