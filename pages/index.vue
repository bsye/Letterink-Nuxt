<template>
  <div class="homepage">
    <SectionHighlights />
  </div>
</template>

<script>
import homepageQuery from "~/graphql/queries/homepage.js";

export default {
  data() {
    return {
      homepage: {},
    };
  },

  mounted() {
    console.log("HOMEPAGE: ", this.homepage);
    // console.log("BASE API: ", process.env.BASE_API);
  },

  async asyncData({ $graphql }) {
    console.log("GRAPHQL: ", $graphql);
    try {
      const { homepage } = await $graphql.default.request(homepageQuery);

      return { homepage };
    } catch (err) {
      console.log("ERROR: ", err);
    }
  },
};
</script>

<style lang="scss" scoped>
.homepage {
  height: calc(100% - 6.48rem);
}
</style>
