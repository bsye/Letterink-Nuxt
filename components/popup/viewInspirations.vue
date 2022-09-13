<template>
  <transition name="popup">
    <div
      class="popup"
      v-show="popupOpen"
    >
      <div
        @click="clickOutside($event)"
        class="outside"
      ></div>
      <div class="inner">
        <div class="popup-header">
          <img
            ref="arrowBefore"
            :class="{ 'disabled' : !moodboards}"
            class="arrow-before"
            src="~/assets/icons/arrow.svg"
          />
          <div class="form-moodboard-header-text">{{ `${$t('board.yourMoodboards')} (${moodboardsCount})` }}</div>
          <img
            ref="arrowAfter"
            :class="{ 'disabled' : !moodboards}"
            class="arrow-after"
            src="~/assets/icons/arrow.svg"
          />
        </div>

        <div
          class="popup-content"
          v-if="moodboards"
        >
          <ElementSlider
            :arrowBefore="arrowBefore"
            :arrowAfter="arrowAfter"
          >
            <TeaserUserMoodboard
              class="swiper-slide"
              @click.native="$root.$emit('hide-popup', true)"
              v-for="(moodboard, index) in moodboards"
              :key="index"
              :moodboard="moodboard"
            />
          </ElementSlider>
        </div>
        <div
          v-else
          class="empty"
        >
          {{ $t('board.notFound') }}
        </div>

        <div class="popup-footer">
          <ElementButton
            @click.native="$root.$emit('hide-popup', true)"
            class="button white full"
          >
            <NuxtLink :to="localePath('/inspirations')">
              <span>{{ $t('board.viewYourMoodboards') }}</span>
            </NuxtLink>
          </ElementButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      popupOpen: false,
      arrowBefore: false,
      arrowAfter: false,
    };
  },

  watch: {
    $route() {
      this.$root.$emit("hide-popup", true);
    },
  },

  mounted() {
    this.$root.$on("show-popup", (state) => {
      if (state) this.popupOpen = state;
    });

    this.$root.$on("hide-popup", (state) => {
      this.popupOpen = false;
    });

    this.arrowBefore = this.$refs.arrowBefore;
    this.arrowAfter = this.$refs.arrowAfter;
  },

  computed: {
    moodboardsCount() {
      return this.$store.getters["moodboards/getMoodboardsCount"];
    },

    moodboards() {
      return this.$store.getters["moodboards/getUserMoodboards"];
    },
  },

  methods: {
    clickOutside(e) {
      this.popupOpen = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  @apply
    absolute
    sm:right-0
    sm:w-[31rem]
    top-[39px]
    right-4
    md:right-5
    z-50
    flex
    justify-end
    items-center;

  .outside {
    @apply
      fixed
      h-screen
      w-screen
      inset-0
      bg-black
      z-40
      bg-opacity-70;
  }

  .inner {
    @apply bg-black
    text-white
    uppercase
    flex
    flex-col
    border
    border-white
    font-sans
    text-sm
    w-[calc(100vw_-_2rem)]
    md:w-[calc(100vw_-_2.5rem)]
    max-w-[31rem]
    lg:w-[31rem]
    z-50

    min-h-[320px]
    md:min-h-[410px];
  }

  .popup-header {
    @apply flex
      justify-between
      md:p-5
      p-4
      relative
      border-b
      border-white;

    .arrow-before {
      @apply
        rotate-180
        cursor-pointer;
    }

    .arrow-after,
    .arrow-before {
      @apply
        px-6
        -mx-6
        py-4
        -my-4;

      &.disabled {
        @apply
          pointer-events-auto
          opacity-0;
      }
    }

    .arrow-after {
      @apply
        cursor-pointer;
    }
  }

  .popup-content {
    @apply
      px-4
      md:px-5
      grow
      pt-5
      md:pt-8;

    &::v-deep {
      .moodboard-counter {
        @apply
          hidden;
      }
    }
  }

  .empty {
    @apply
      px-5
      grow
      flex
      justify-center
      items-center
      pt-8;
  }

  .popup-footer {
    @apply
      p-4
      md:p-5;

    button {
      @apply
        w-full;
    }
  }
}

.popup-enter-active,
.popup-leave-active {
  @apply
    transition-opacity;
}

.popup-enter,
.popup-leave-to {
  @apply opacity-0;
}
</style>