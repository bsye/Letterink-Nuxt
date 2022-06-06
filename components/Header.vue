<template>
  <div class="header" :class="addBorder && 'header-border'">
    <NuxtLink class="logo" :to="localePath({ name: 'index' })">
      letterink
    </NuxtLink>

    <div class="links" v-if="menu && menu.menuItems">
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
      <div class="inspirations-counter">
        <NuxtLink
          class="inspiration"
          :to="localePath({ name: 'inspirations' })"
        >
          ispirations
        </NuxtLink>

        <NuxtLink
          :to="localePath({ name: 'inspirations-your-moodboards' })"
          class="counter"
        >
          0
        </NuxtLink>
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

      <button class="menu-open" @click="mobileMenuOpen = true">Menu</button>
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
      return !(
        !this.$route.name ||
        this.$route.name.includes("index") ||
        this.$route.name.includes("contact") ||
        this.$route.name.includes("works-slug")
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  @apply h-54
    bg-white
    flex
    justify-between
    items-center
    text-sm
    font-cabinet-grotesk
    font-bold
    uppercase
    px-4
    
    md:font-normal;

  &.header-border {
    @apply border-b
      border-black;
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
      gap-x-4
      
      md:gap-x-2;

    .inspirations-counter {
      @apply flex
        items-center
        gap-x-2;

      .inspiration {
        @apply hidden
          underline
        
          md:flex;

        &:hover {
          @apply no-underline;
        }

        @screen md {
          text-underline-position: under;
        }
      }

      .counter {
        @apply rounded-full
          bg-black
          text-white
          h-6
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