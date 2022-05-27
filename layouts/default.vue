<template>
  <div class="layout">
    <Header />
    <Nuxt />
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

  mounted() {
    if (this.$route.hash) {
      const el = document.querySelector(this.$route.hash);
      el &&
        el.scrollIntoView({
          behavior: "smooth",
        });
    } else if (this.$config.livePreview) {
      const storageKey = `scrollPosition:${this.$route.path}`;

      // If scroll position is set, scroll to it
      if (sessionStorage.getItem(storageKey)) {
        window.scrollTo(0, parseInt(sessionStorage.getItem(storageKey)));
      }

      // Record scroll position in session storage to retain scroll position in Live Preview
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

<style lang="scss" scoped>
.layout {
  @apply h-screen;
}
</style>