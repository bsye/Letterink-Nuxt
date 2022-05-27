<template>
  <div class="homepage">
    <SectionHighlights />
  </div>
</template>

<script>
import query from "~/graphql/queries/homepage.js";

export default {
  data() {
    return {
      homepage: {},
    };
  },

  mounted() {
    console.log("HOMEPAGE: ", this.homepage);
  },

  async asyncData({ $graphql }) {
    console.log("GRAPHQL: ", $graphql);
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
  height: calc(100vh - 3.375rem);

  @screen md {
    height: calc(100vh - 6.75rem);
  }
}
</style>
