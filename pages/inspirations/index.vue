<template>
  <div class="inspirations">
    <SectionUserMoodboards />
    <SectionFeaturedMoodboards />

    <SectionInspirationFilters
      :colors="inspirationsColors"
      :categories="inspirationsCategories"
    />

    <div class="inspirations-container">

      <SectionInspirationsMasonry
        v-if="inspirations"
        :inspirations="inspirations"
      />
    </div>
  </div>
</template>

<script>
import query from "~/graphql/queries/inspirations";

export default {
  data() {
    return {
      inspirations: null,
      inspirationsCategories: null,
      inspirationsColors: null,
      inspiration: {},
    };
  },

  async asyncData({ $graphql, route, store }) {
    try {
      // If with any filter
      if (route.query.category || route.query.color) {
        const {
          inspirationsByCategories,
          inspirationsCategories,
          inspirationsColors,
        } = await $graphql.default.request(query, {
          category: route.query.category,
          color: route.query.color,
        });

        const inspirations = inspirationsByCategories;

        return {
          inspirations,
          inspirationsCategories,
          inspirationsColors,
        };
      }

      // Without filters
      const { inspirations, inspirationsCategories, inspirationsColors } =
        await $graphql.default.request(query);

      return {
        inspirations,
        inspirationsCategories,
        inspirationsColors,
      };
    } catch (error) {
      console.log("ERROR: ", error);
    }
  },
};
</script>

<style lang="scss" scoped>
.inspirations {
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.3s;
}
.dropdown-enter,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10%);
}
</style>
