<template>
  <div class="layout">
    <Header />
    <div class="site-content">
      <Nuxt />
    </div>
    <Overlay />
    <Footer />
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollPosition: 0,
      ticking: false,
    };
  },

  watch: {
    $route() {
      document.querySelector("body").style.color = null;
    },
  },

  mounted() {
    if (this.$route.hash) {
      const el = document.querySelector(this.$route.hash);
      el &&
        el.scrollIntoView({
          behavior: "smooth",
        });
    } else if (this.$config.livePreview) {
      const storageKey = `scrollPosition:${this.$route.path}`;

      if (sessionStorage.getItem(storageKey)) {
        window.scrollTo(0, parseInt(sessionStorage.getItem(storageKey)));
      }

      setTimeout(() => {
        window.addEventListener("scroll", () => {
          this.scrollPosition = window.scrollY;

          if (!this.ticking) {
            window.requestAnimationFrame(() => {
              sessionStorage.setItem(storageKey, this.scrollPosition);
              this.ticking = false;
            });

            this.ticking = true;
          }
        });
      }, 1000);
    }
  },
};
</script>

<style lang="scss">
.layout {
  @apply
    flex
    flex-col
    min-h-screen;

  .site-content {
    @apply
      grow
      flex
      flex-col;
  }
}

html {
  * {
    @apply
      border-black;
  }
}

html.dark {
  @apply
    bg-black
    border-white
    text-white;

  * {
    @apply
      border-white;
  }

  .header {
    &.seamless {
      @apply
        bg-black;
    }

    .header-right {
      .inspirations-counter {
        div.counter {
          @apply
            bg-white
            text-black;
        }
      }
    } 
  }
}

* {
  @apply
    antialiased;
}


.page-enter-active,
.page-leave-active {
  @apply transition-opacity;
}

.page-enter,
.page-leave-to {
  @apply opacity-0;
}
</style>