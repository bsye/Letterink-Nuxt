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

  watch: {
    "$route.query": {
      deep: true,
      handler() {
        this.fetchInspirations();
      },
    },
  },

  methods: {
    async fetchInspirations() {
      const category = this.$route.query.category;
      const color = this.$route.query.color;

      if (!category && !color) {
        const { inspirations } = await this.$graphql.default.request(query);

        this.inspirations = inspirations;
      }

      if (category || color) {
        const { inspirationsByCategories } =
          await this.$graphql.default.request(query, {
            category: category,
            color: color,
          });

        this.inspirations = inspirationsByCategories;
      }
    },
  },

  async asyncData({ $graphql, route, store }) {
    try {
      // If with any filter
      console.log(route.query.category);
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

      console.log(inspirationsCategories);

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
