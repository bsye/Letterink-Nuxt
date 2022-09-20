<template>
  <div class="single-moodboard">
    <div>
      <SectionPageHeader
        :title="moodboard.title"
        :back="route"
        :section="$t('User moodboards')"
      />

      <SectionMoodboardActions :length="$get(moodboard,'inspirationItems.length')">
        <ElementButton @click.native="$root.$emit('show-overlay','modal-duplicate-board-only')">Duplica</ElementButton>
        <ElementButton @click.native="$root.$emit('show-overlay','modal-rename-board')">Rinomina</ElementButton>
        <ElementButton @click.native="$root.$emit('show-overlay','modal-share-board')">Condividi</ElementButton>
      </SectionMoodboardActions>
    </div>

    <div class="content">
      <SectionUserInspirationsMasonry
        v-if="moodboard.inspirationItems"
        :inspirations="moodboard.inspirationItems"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    moodboard() {
      const userMoodboard = this.$store.getters[
        "moodboards/getUserMoodboardById"
      ](this.$route.query.id);
      this.$store.dispatch("moodboards/setCurrentMoodboard", userMoodboard);
      return userMoodboard;
    },

    route() {
      if (this.$nuxt.context.from.name !== this.$nuxt.context.route.name)
        return this.localePath(this.$nuxt.context.from);
      return this.localePath("inspirations");
    },
  },
};
</script>

<style lang="scss" scoped>
.single-moodboard {
  @apply
    flex
    flex-grow
    flex-col;

  .content {
    @apply
      grow
      relative;
  }
}
</style>
