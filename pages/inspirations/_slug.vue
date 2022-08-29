<template>
  <div class="single-moodboard">
    <div>
      <SectionPageHeader
        :title="moodboard.title"
        :back="localePath('inspirations')"
        :section="$t('Inspirational moodboard')"
      />

      <SectionMoodboardActions :length="$get(moodboard,'inspirationItems.length')">
        <ElementButton @click.native="$root.$emit('show-overlay','modal-duplicate-board')">Duplica</ElementButton>
        <ElementButton @click.native="$root.$emit('show-overlay','modal-share-featured-board')">Condividi</ElementButton>
      </SectionMoodboardActions>
    </div>

    <div class="content">
      <SectionInspirationsMasonry
        v-if="moodboard.inspirationItems"
        :inspirations="moodboard.inspirationItems"
      />
    </div>
  </div>
</template>

<script>
import query from "~/graphql/queries/singleMoodboard";

export default {
  data() {
    return {
      moodboard: null,
    };
  },

  async asyncData({ $graphql, params, store }) {
    try {
      const { moodboard } = await $graphql.default.request(query, {
        slug: params.slug,
      });

      store.dispatch("moodboards/setCurrentMoodboard", moodboard);
      return { moodboard };
    } catch (error) {
      console.log("ERROR: ", error);
    }
  },
};
</script>

<style lang="scss" scoped>
.single-moodboard {
  @apply
    flex
    flex-grow
    flex-col;

  &::v-deep {
    .back {
      filter: invert(1);
    }
  }

  .content {
    @apply
      grow
      relative;
  }
}
</style>
