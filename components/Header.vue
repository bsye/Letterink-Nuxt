<template>
  <div
    class="header"
    :class="{ 'seamless': addBorder, 'home': inHome}"
  >
    <NuxtLink
      class="logo"
      :to="localePath({ name: 'index' })"
    >
      Letterink
    </NuxtLink>

    <div
      class="links"
      v-if="menu && menu.menuItems"
    >
      <LinkHandler
        class="link"
        :link="item"
        v-for="item of menu.menuItems"
        :key="item.id"
      >
        {{ item.label }}
      </LinkHandler>
    </div>

    <div class="header-right">
      <div class="moodboards">
        <button @click="$root.$emit('show-popup', true)">
          {{ $t('inspiration') }}
          <div>
            <div class="counter">
              {{ moodboardsCount }}
            </div>
          </div>
        </button>
        <PopupViewInspirations />
      </div>

      <div class="languages">
        <a
          :href="switchLocalePath(locale.code)"
          :class="locale.code === $i18n.locale && 'current-locale'"
          v-for="locale of $i18n.locales"
          :key="locale.code"
          @click.prevent.stop="$i18n.setLocale(locale.code)"
        >
          {{ locale.code }}
        </a>
      </div>

      <button
        class="menu-open"
        @click="mobileMenuOpen = true"
      >{{ $t('header.menu') }}</button>
    </div>

    <ContentMenuMobile
      v-if="menu && menu.menuItems"
      :links="menu.menuItems"
      :menuOpen="mobileMenuOpen"
      @closeMobileMenu="mobileMenuOpen = false"
    />
  </div>
</template>

<script>
import query from "~/graphql/queries/menu";

export default {
  data() {
    return {
      menu: null,
      mobileMenuOpen: false,
    };
  },

  async fetch() {
    try {
      const { menu } = await this.$graphql.default.request(query);

      this.menu = menu;
    } catch (error) {
      console.log("ERROR MENU: ", error);
    }
  },

  computed: {
    addBorder() {
      return (
        !this.$route.name ||
        this.$route.name.includes("index") ||
        this.$route.name.includes("contact") ||
        this.$route.name.includes("works-slug")
      );
    },

    inHome() {
      return this.$route.name.includes("index");
    },

    moodboardsCount() {
      return this.$store.getters["moodboards/getMoodboardsCount"];
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  @apply h-54
    flex
    justify-between
    items-center
    text-sm
    font-sans
    font-bold
    border-b
    uppercase
    px-4
    
    md:font-normal;

  &.home {
    @apply
      absolute
      z-[50]
      top-0
      w-full
      left-0
      right-0
      bg-transparent;
  }

  &.seamless {
    @apply
      border-transparent;
  }

  .logo {
    @apply w-48;
  }

  .links {
    @apply hidden
      items-center
      justify-center
      gap-x-2
    
      md:flex;

    .link {
      @apply relative;

      &:not(:last-child)::after {
        @apply ml-2
          inline-block;
        content: "/";
      }
    }

    a {
      @apply underline;
      text-underline-position: under;

      &:hover {
        @apply no-underline;
      }
    }
  }

  .header-right {
    @apply flex
      justify-end
      gap-x-4
      w-48
      md:gap-x-2;

    .moodboards {
      @apply
        flex
        items-center
        sm:relative;

      button {
        @apply
          flex
          items-center
          uppercase;
      }

      .counter {
        @apply rounded-full
          bg-black
          text-white
          h-6

          ml-2
          w-6
          flex
          justify-center
          items-center;
      }
    }

    .languages {
      @apply hidden
        gap-x-1
        items-center
      
        md:flex;

      a {
        text-underline-position: under;

        &:hover {
          @apply underline;
        }

        &.current-locale {
          @apply underline;

          &:hover {
            @apply no-underline;
          }
        }

        &:not(:last-child)::after {
          @apply ml-1
          inline-block;
          content: "/";
        }
      }
    }

    .menu-open {
      @apply uppercase
        font-bold
        
        md:hidden;
    }
  }
}
</style>