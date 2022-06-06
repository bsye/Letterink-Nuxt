<template>
  <footer
    :class="inHome && 'footer-highlights'"
    :style="isDesktop && backgroundColor ? backgroundColor : ''"
  >
    <div class="footer-left" :style="textColor ? textColor : ''">
      <div class="footer-copyright" v-if="copyright">
        {{ copyright }}
      </div>

      <div class="mobile-footer-left">
        <div class="mobile-footer-copyright">©2022</div>
        <a href="#credits" class="mobile-footer-credits">Credits</a>
      </div>
    </div>

    <div class="footer-right" :style="textColor ? textColor : ''">
      <div class="footer-links">
        <a href="#credits" class="footer-credits">Credits</a>
        <a
          v-if="instagramUrl"
          target="_blank"
          :href="instagramUrl"
          class="footer-instagram"
        >
          Instagram
        </a>
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
    </div>
  </footer>
</template>

<script>
import query from "~/graphql/queries/contact";
import { mapState } from "vuex";

export default {
  data() {
    return {
      socials: null,
      isDesktop: false,
    };
  },

  async fetch() {
    try {
      const { socials } = await this.$graphql.default.request(query);

      this.socials = socials;
    } catch (err) {
      console.log("ERROR: ", err);
    }
  },

  mounted() {
    this.checkIfDesktop();

    window.addEventListener("resize", () => {
      this.checkIfDesktop();
    });
  },

  destroyed() {
    window.removeEventListener("resize", () => {
      this.isDesktop = false;
    });
  },

  methods: {
    checkIfDesktop() {
      this.isDesktop = window.innerWidth >= 768;
    },
  },

  computed: {
    ...mapState(["textColor", "backgroundColor"]),

    instagramUrl() {
      if (this.socials && this.socials.instagramUrl)
        return this.socials.instagramUrl.url;
      return null;
    },

    copyright() {
      if (this.socials && this.socials.copyright) return this.socials.copyright;
      return null;
    },

    inHome() {
      return this.$route.name.includes("index");
    },
  },

  watch: {
    $route: {
      deep: true,
      handler() {
        this.$store.commit("updateTextColor", null);
        this.$store.commit("updateBackgroundColor", null);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  @apply h-54
    w-full
    px-4
    flex
    justify-between
    items-center
    uppercase
    text-sm
    font-cabinet-grotesk
    font-bold
    transition-colors
    
    md:font-normal
    md:px-5;

  &.footer-highlights {
    @apply fixed
      bottom-0;
  }

  .footer-left {
    @apply transition-colors;

    .footer-copyright {
      @apply hidden

        md:flex;
    }

    .mobile-footer-left {
      @apply flex
        gap-x-1

        md:hidden;

      .mobile-footer-credits {
        &::before {
          @apply mr-1;
          content: "/";
        }
      }
    }
  }

  .footer-right {
    @apply flex
      transition-colors;

    .footer-links {
      @apply hidden
        gap-x-2

        md:flex;

      a {
        @apply underline;
        text-underline-position: under;

        &:hover {
          @apply no-underline;
        }

        &.footer-instagram {
          &::before {
            @apply pr-1
              inline-block;
            content: "/";
          }
        }
      }
    }

    .languages {
      @apply gap-x-1
        flex
        items-center
        
        md:hidden;

      a {
        text-underline-position: under;

        &:hover {
          @apply md:underline;
        }

        &.current-locale {
          @apply underline;

          &:hover {
            @apply md:no-underline;
          }
        }

        &:not(:last-child)::after {
          @apply ml-1
          inline-block;
          content: "/";
        }
      }
    }
  }
}
</style>