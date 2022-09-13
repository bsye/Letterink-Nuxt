<template>
  <transition name="menu">
    <div
      v-if="menuOpen"
      class="menu-mobile"
    >
      <div class="menu-mobile-header">
        <NuxtLink
          class="menu-mobile-logo"
          :to="localePath({ name: 'index' })"
        >
          letterink
        </NuxtLink>

        <button
          class="menu-mobile-close"
          @click="$emit('closeMobileMenu')"
        >
          Close
        </button>
      </div>

      <div class="menu-mobile-links">
        <LinkHandler
          class="menu-mobile-link"
          v-for="link of links"
          :key="link.id"
          :link="link"
        >
          {{ link.label }}
        </LinkHandler>

        <NuxtLink
          class="menu-mobile-link"
          :to="localePath({ name: 'inspirations' })"
        >
          inspirations
        </NuxtLink>

        <NuxtLink
          class="menu-mobile-link"
          :to="localePath({ name: 'inspirations-your-moodboards' })"
        >
          {{ $t('moodboard') }} ({{ 0 }})
        </NuxtLink>
      </div>

      <div class="menu-mobile-footer">
        <Footer />
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    links: Array,
    menuOpen: Boolean,
  },

  watch: {
    $route: {
      deep: true,
      handler() {
        this.$emit("closeMobileMenu");
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-mobile {
  @apply fixed
    z-20
    bg-black
    text-white
    w-full
    h-full
    inset-0;

  .menu-mobile-header {
    @apply h-54
        flex
        justify-between
        items-center
        px-4;

    .menu-mobile-logo {
      @apply uppercase
        font-bold
        font-sans;
    }

    .menu-mobile-close {
      @apply uppercase
        font-bold
        font-sans;
    }
  }

  .menu-mobile-links {
    @apply flex
        flex-col
        w-full
        items-center
        justify-center;
    height: calc(100% - 108px);

    .menu-mobile-link {
      @apply text-42
        font-sans
        font-normal
        border-b
        border-white
        w-full
        text-center
        py-2;
      line-height: initial;

      &:last-child {
        @apply border-none;
      }

      &:nth-child(3n + 2) {
        @apply font-serif;
      }

      &:nth-child(3n + 3) {
        @apply font-bold;
      }
    }
  }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}

.menu-enter,
.menu-leave-to {
  @apply opacity-0;
}
</style>