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
      <ElementSliderCentered
        slidesPerView="3"
        class="slider"
      >
        <template v-for="moodboard of getFeatured">
          <TeaserMoodboard
            class="swiper-slide"
            :key="moodboard.id"
            :moodboard="moodboard"
          />
        </template>
      </ElementSliderCentered>
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
    overflow-hidden;

  .moodboards-label {
    @apply uppercase
      text-sm
      font-sans
      w-full
      text-center
      py-5;
  }

  .user {
    @apply
      w-full
      text-center
      mt-8
      mx-auto;
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