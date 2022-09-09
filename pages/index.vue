<template>
  <div class="homepage">
    <SectionWorkHighlights
      v-if="homepage"
      :highlights="homepage"
    />
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
  @apply
   grow
   flex
   flex-col;
}
</style>
