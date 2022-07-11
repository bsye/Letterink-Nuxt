<template>
  <div class="works">
    <div class="works-categories" v-if="categories">
      <NuxtLink class="works-category" :to="localePath({ name: 'works' })">
        All
      </NuxtLink>

      <NuxtLink
        class="works-category"
        :to="localePath({ name: 'works', query: { category: filter.slug } })"
        v-for="filter of categories"
        :key="filter.id"
      >
        {{ filter.title }}
      </NuxtLink>
    </div>

    <div class="works-container" v-if="worksBlock">
      <div
        class="works-block"
        v-for="(block, index) of worksBlock"
        :key="index"
      >
        <NuxtLink
          :to="localePath({ name: 'works-slug', params: { slug: work.slug } })"
          class="work"
          v-for="(work, index) of block"
          :key="index"
        >
          <figure>
            <img v-if="work.image[0]" :src="work.image[0].url" />
          </figure>

          <div class="work-title" v-if="work.title">
            {{ work.title }}
          </div>

          <div class="work-categories" v-if="work.workCategories.length">
            <span
              class="work-category"
              v-for="category of work.workCategories"
              :key="category.id"
            >
              {{ category.title }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
import query from "~/graphql/queries/works.js";

export default {
  data() {
    return {
      works: null,
      categories: null,
      selectedCategory: null,
    };
  },

  async asyncData({ $graphql, route }) {
    try {
      if (route.query.category) {
        const { worksByCategory, categories } = await $graphql.default.request(
          query,
          {
            category: route.query.category,
          }
        );

        const works = worksByCategory;

        return { works, categories };
      }

      const { works, categories } = await $graphql.default.request(query);
      return { works, categories };
    } catch (err) {
      console.log("ERROR: ", err);
    }
  },

  methods: {
    async fetchWorks() {
      try {
        const { worksByCategory } = await this.$graphql.default.request(query, {
          category: this.$route.query.category,
        });

        this.works = worksByCategory;
      } catch (err) {
        console.log("ERROR: ", err);
      }
    },
  },

  computed: {
    worksBlock() {
      const blockSize = 8;
      let blocks = [];

      for (let i = 0; i < this.works.length; i += blockSize) {
        const block = this.works.slice(i, i + blockSize);

        blocks.push(block);
      }
      return blocks;
    },
  },

  watch: {
    "$route.query": {
      deep: true,
      handler(query) {
        this.fetchWorks();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.works {
  @apply w-screen;

  .works-categories {
    @apply px-4
      py-5
      flex
      gap-x-5
      overflow-auto
      
      md:justify-center;

    .works-category {
      @apply uppercase
        text-sm
        font-cabinet-grotesk
        whitespace-nowrap;

      &:last-child {
        @apply mr-4;
      }

      &.nuxt-link-exact-active {
        @apply underline;
        text-underline-position: under;
      }
    }
  }

  .works-container {
    @apply flex
        flex-col
        gap-y-4
        w-full
        px-4
        
        md:gap-y-5;

    .works-block {
      @apply flex
        flex-col
        gap-y-4
        
        md:grid
        md:gap-y-12;

      @screen md {
        grid-template-columns: 0.35fr 0.15fr 0.06fr 0.15fr 0.07fr 0.22fr;
      }

      .work {
        @apply w-full
        flex
        flex-col
        items-center
        gap-y-2
        uppercase
        text-sm
        font-cabinet-grotesk;

        figure {
          @apply w-full
            h-full
            mb-2
            relative;

          img {
            @apply w-full
                h-full
                object-cover
                absolute;
          }
        }

        .work-categories {
          @apply flex
            gap-x-2
            text-gray-primary;
        }

        &:nth-child(1) {
          @apply md:pr-5;
          grid-column: 1/4;
          grid-row: 1/3;

          figure {
            padding-bottom: 97%;
          }
        }

        &:nth-child(2) {
          grid-column: 4/6;

          figure {
            padding-bottom: 64.4%;
          }
        }

        &:nth-child(3) {
          grid-column: 5/7;
          grid-row: 2/3;

          figure {
            padding-bottom: 138.6%;
          }
        }

        &:nth-child(4) {
          @apply md:pr-5;
          grid-column: 1/2;
          grid-row: 3/5;

          figure {
            @apply h-auto;
            padding-bottom: 100%;
          }
        }

        &:nth-child(5) {
          @apply md:pr-5;
          grid-column: 2/4;
          grid-row: 3/4;

          figure {
            padding-bottom: 64.4%;
          }
        }

        &:nth-child(6) {
          grid-column: 4/7;
          grid-row: 3/5;

          figure {
            padding-bottom: 100%;
          }
        }

        &:nth-child(7) {
          @apply md:pr-5;
          grid-column: 1/3;
          grid-row: 5/6;

          figure {
            padding-bottom: 114.4%;
          }
        }

        &:nth-child(8) {
          grid-column: 3/7;
          grid-row: 5/6;

          figure {
            padding-bottom: 114.4%;
          }
        }
      }
    }
  }
}
</style>