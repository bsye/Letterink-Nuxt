<template>
  <section
    class="moodboards"
    v-if="getFeatured"
  >
    <div class="moodboards-label">
      <span> Inspirational Moodboard </span>
    </div>

    <div
      class="moodboards-content"
      :class="'in-your-moodboards'"
    >
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
  @apply pb-16
    relative
    z-0
    overflow-hidden;

  .moodboards-label {
    @apply uppercase
      text-sm
      font-sans
      w-full
      text-center
      py-5;
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

  .moodboards-content {
    @apply
      grid
      grid-flow-col-dense
      overflow-auto
      px-2.5
      lg:justify-center
      relative;

    &::-webkit-scrollbar {
      @apply hidden;
    }

    .moodboard {
      @apply
        min-w-[200px]
        lg:w-[250px]
        xl:min-w-[250px]
        xl:w-[17vw]
        px-2.5;
    }
  }
}
</style>