<template>
  <section class="moodboards">
    <div class="label">
      <span> {{ $t("board.yourMoodboards") }} </span>
    </div>

    <div class="content" :class="'in-your-moodboards'">
      <template v-if="getUserMoodboards">
        <div
          v-for="(moodboard, key, index) of getUserMoodboards"
          :key="moodboard.id"
          class="teaser-moodboard"
        >
          <TeaserUserMoodboard v-if="index < 3" :moodboard="moodboard" />

          <TeaserViewUserMoodboard
            v-else-if="index == 3"
            v-once
            :placeholderLength="Object.keys(getUserMoodboards).length"
            :moodboard="moodboard"
          />
        </div>
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
  @apply
    md:pb-16
    pb-10
    relative
    z-0
    bg-black
    text-white
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
      px-4
      gap-4
      justify-start
      lg:justify-center
      relative

      md:px-6
      md:gap-6;

    &::-webkit-scrollbar {
      @apply hidden;
    }

    .teaser-moodboard:nth-child(n + 5) {
      @apply
        hidden;
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