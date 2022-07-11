<template>
  <div class="homepage">
    <SectionHighlights v-if="homepage" :highlights="homepage" />
  </div>
</template>

<script>
import query from "~/graphql/queries/homepage.js";

export default {
  data() {
    return {
      homepage: null,
    };
  },

  async asyncData({ $graphql }) {
    try {
      const { homepage } = await $graphql.default.request(query);

      return { homepage };
    } catch (err) {
      console.log("ERROR: ", err);
    }
  },
};
</script>

<style lang="scss" scoped>
.homepage {
  // @apply relative

  //   md:top-0;
  // top: -3.375rem;
  height: calc(100vh - 3.375rem);

  @screen md {
    height: calc(100vh - 6.75rem);
  }
}
</style>
