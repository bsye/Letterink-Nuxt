<template>
  <div
    v-if="moodboard"
    class="single-moodboard"
  >
    <div>
      <SectionPageHeader
        :title="moodboard.title"
        :back="route"
        :section="$t('User moodboards')"
      />

      <SectionMoodboardActions :length="$get(moodboard,'inspirationItems.length')">
        <ElementButton @click.native="$root.$emit('show-overlay','modal-save-board')">Salva</ElementButton>
      </SectionMoodboardActions>
    </div>

    <div class="content">
      <SectionInspirationsMasonry
        v-if="moodboard.inspirationItems"
        :inspirations="moodboard.inspirationItems"
      />
    </div>
  </div>
  <div
    v-else
    class="single-moodboard"
  >
    <div class="header">
      <div class="header-label-container">
        <span class="header-label">
          {{ $t('board.shared') }}
        </span>
      </div>
      <div class="header-title">
        {{ $t('board.notFoundBoard') }}
      </div>
    </div>
    <div class="content not-found">
      {{ $t('board.sharedNotFound') }}
      <NuxtLink :to="localePath({name: 'inspirations'})">
        <ElementButton class="button full white">
          {{ $t('board.goTo') }}
        </ElementButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { Base64 } from "js-base64";

export default {
  data() {
    return {
      moodboard: null,
    };
  },

  mounted() {
    const moodboardHash = this.$route.query.hash;
    try {
      const parsed = JSON.parse(Base64.decode(moodboardHash));
      if (this.$get(parsed, "title")) {
        this.moodboard = parsed;
        this.$store.dispatch("moodboards/setCurrentMoodboard", this.moodboard);
      }
    } catch (error) {
      return false;
    }
  },

  computed: {
    route() {
      if (this.$nuxt.context.from.name !== this.$nuxt.context.route.name)
        return this.localePath(this.$nuxt.context.from);
      return this.localePath("inspirations");
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
