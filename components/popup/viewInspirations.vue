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
          <div class="form-moodboard-header-text">{{ `${$t('board.yourMoodboard')} (${moodboardsCount})` }}</div>
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
              v-for="moodboard in moodboards"
              :key="moodboard.id"
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
              <span>{{ $t('board.viewYourMoodboard') }}</span>
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
    right-[-4px]
    w-[31rem]
    top-10
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
      bg-opacity-30;
  }

  .inner {
    @apply bg-black
    text-white
    uppercase
    flex
    flex-col
    font-sans
    text-sm
    w-[31rem]
    z-50
    min-h-[410px];
  }

  .popup-header {
    @apply flex
      justify-between
      px-5
      py-5
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
      px-5
      grow
      pt-8;

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
      p-5;

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