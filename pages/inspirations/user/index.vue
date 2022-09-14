<template>
  <PageUserArchive v-if="isArchive" />
  <PageUserSingle v-else />
</template>

<script>
export default {
  data() {
    return {
      isArchive: true,
    };
  },

  watch: {
    deep: true,
    immediate: true,
    $route() {
      const userMoodboard = this.$store.getters[
        "moodboards/getUserMoodboardById"
      ](this.$route.query.id);
      if (userMoodboard) this.isArchive = false;
      else this.isArchive = true;
    },
  },

  mounted() {
    const userMoodboard = this.$store.getters[
      "moodboards/getUserMoodboardById"
    ](this.$route.query.id);
    if (userMoodboard) this.isArchive = false;
    else this.isArchive = true;
  },
};
</script>

<style>
</style>