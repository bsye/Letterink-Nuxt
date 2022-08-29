<template>
  <div class="single-moodboard">
    <div>
      <SectionPageHeader
        :title="moodboard.title"
        :back="localePath('inspirations-user')"
        :section="$t('User moodboards')"
      />

      <SectionMoodboardActions :length="$get(moodboard,'inspirationItems.length')">
        <ElementButton @click.native="$root.$emit('show-overlay','modal-duplicate-board')">Duplica</ElementButton>
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
      ](this.$route.params.id);
      this.$store.dispatch("moodboards/setCurrentMoodboard", userMoodboard);
      return userMoodboard;
    },
  },

  head() {
    return {
      htmlAttrs: {
        class: `dark`,
      },
    };
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
