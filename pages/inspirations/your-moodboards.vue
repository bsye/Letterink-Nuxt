<template>
  <div class="your-moodboards">
    <SectionMoodboards
      v-if="moodboards"
      :moodboards="moodboards"
      :yourMoodboards="true"
    />
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
  @apply overflow-y-auto;
  height: calc(100% - 108px);
}
</style>