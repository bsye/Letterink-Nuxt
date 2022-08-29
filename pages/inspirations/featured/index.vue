<template>
  <div class="featured">
    <div class="title">
      <NuxtLink
        class="back"
        :to="localePath('inspirations')"
      >
        <img src="~/assets/icons/arrow.svg" />
      </NuxtLink>
      {{ $t('Inspirational moodboards') }}
      <div></div>
    </div>
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
  @apply
    px-5;

  .inspirations {
    @apply
      mt-5
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

  .title {
    @apply
      mt-5
      grid
      justify-between
      grid-flow-col-dense
      gap-4
      uppercase;

    .back {
      @apply
        -m-5
        p-5;

      img {
        @apply
          rotate-180;

        filter: invert(1);
      }
    }
  }
}
</style>
