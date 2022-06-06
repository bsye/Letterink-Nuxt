<template>
  <div class="your-moodboards">
    <SectionMoodboards v-if="moodboards" :moodboards="moodboards" />
  </div>
</template>

<script>
import query from "~/graphql/queries/moodboards";

export default {
  data() {
    return {
      moodboards: null,
    };
  },

  async asyncData({ $graphql }) {
    try {
      const { moodboards } = await $graphql.default.request(query);

      return { moodboards };
    } catch (error) {
      console.log("ERROR: ", error);
    }
  },
};
</script>

<style lang="scss" scoped>
.your-moodboards {
  height: calc(100% - 108px);
}
</style>