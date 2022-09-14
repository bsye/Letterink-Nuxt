<template>
  <section
    class="moodboards"
    v-if="getFeatured"
  >
    <div class="label">
      <span> {{ $t('board.inspirationals') }} </span>
    </div>

    <div class="content">
      <div
        v-for="(moodboard, key, index) of getFeatured"
        :key="moodboard.id"
      >
        <TeaserFeaturedMoodboard
          v-if="index < 3"
          :moodboard="moodboard"
        />
        <TeaserViewFeaturedMoodboard
          v-else
          v-once
          :placeholderLength="Object.keys(getFeatured).length"
          :moodboard="moodboard"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("moodboards", ["getFeatured", "getUserMoodboards"]),
  },
};
</script>

<style lang="scss" scoped>
.moodboards {
  @apply
    md:pb-16
    pb-10
    relative
    z-0
    overflow-hidden;

  .label {
    @apply uppercase
      text-sm
      font-sans
      w-full
      text-center
      py-4
      md:py-5;
  }

  .placeholder {
    @apply
      relative;

    .overlay {
      @apply
        inset-0
        bg-black
        w-full
        h-full
        absolute;
    }
  }

  .user {
    @apply
      w-full
      text-center
      mt-8
      mx-auto;
  }

  .content {
    @apply
      grid
      grid-flow-col-dense
      overflow-auto
      justify-start
      px-4
      gap-4
      lg:justify-center
      relative

      md:px-6
      md:gap-6;

    &::-webkit-scrollbar {
      @apply hidden;
    }

    .moodboard {
      @apply
        w-[200px]
        lg:w-[250px]
        xl:min-w-[250px]
        xl:w-[17vw];
    }
  }
}
</style>