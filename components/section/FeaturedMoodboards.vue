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
    <div
      class="user"
      v-if="!getUserMoodboards"
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