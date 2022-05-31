<template>
  <footer>
    <div class="footer-left">
      <div class="footer-copyright" v-if="copyright">
        {{ copyright }}
      </div>

      <div class="mobile-footer-left">
        <div class="mobile-footer-copyright">©2022</div>
        <a href="#credits" class="mobile-footer-credits"> / Credits</a>
      </div>
    </div>

    <div class="footer-right">
      <div class="footer-links">
        <a href="#credits" class="footer-credits">Credits</a>
        <a :href="instagramUrl" class="footer-instagram">/ Instagram</a>
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

export default {
  data() {
    return {
      socials: null,
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

  computed: {
    instagramUrl() {
      if (this.socials && this.socials.instagramUrl)
        return this.socials.instagramUrl.url;
      return null;
    },

    copyright() {
      if (this.socials && this.socials.copyright) return this.socials.copyright;
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
footer {
  @apply h-54
    w-full
    bg-white
    px-4
    flex
    justify-between
    items-center
    uppercase
    text-sm
    font-cabinet-grotesk
    font-bold
    
    md:font-normal
    md:px-5;

  .footer-left {
    .footer-copyright {
      @apply hidden

        md:flex;
    }

    .mobile-footer-left {
      @apply flex
        gap-x-2

        md:hidden;
    }
  }

  .footer-right {
    @apply flex;

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
  }
}
</style>