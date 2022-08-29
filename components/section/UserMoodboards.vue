<template>
  <section class="moodboards">
    <div class="moodboards-label">
      <span> Your Moodboards </span>
    </div>

    <div
      class="moodboards-content"
      :class="'in-your-moodboards'"
    >
      <template v-if="getUserMoodboards">
        <template v-for="(moodboard, key, index) of getUserMoodboards">
          <TeaserUserMoodboard
            v-if="index < 3"
            class="swiper-slide"
            :key="moodboard.id"
            :moodboard="moodboard"
          />

          <TeaserViewUserMoodboard
            class="swiper-slide"
            v-else-if="index == 4"
            :placeholderLength="Object.keys(getUserMoodboards).length"
            :key="moodboard.id"
            :moodboard="moodboard"
          />
        </template>
      </template>
      <TeaserAddUserMoodboard v-if="displayAddMoodboard" />
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("moodboards", ["getUserMoodboards"]),

    displayAddMoodboard() {
      if (!this.getUserMoodboards) return true;
      if (Object.keys(this.getUserMoodboards).length < 4) return true;

      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
.moodboards {
  @apply pb-16
    relative
    z-0
    bg-black
    text-white
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
      -mx-8
      grid
      grid-flow-col-dense
      overflow-auto
      justify-center
      relative;

    &::-webkit-scrollbar {
      @apply hidden;
    }

    .moodboard {
      @apply
        min-w-[300px]
        px-2.5;
    }
  }
}
</style>