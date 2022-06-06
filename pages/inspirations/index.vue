<template>
  <div class="inspirations">
    <SectionMoodboards v-if="moodboards" :moodboards="moodboards" />

    <div class="inspirations-container">
      <div class="inspirations-filters">
        <div class="inspiration-filters-label">Filters</div>

        <div class="filters">
          <div class="inspirations-filters-categories">
            <button
              @click="toggleDropdown('categories')"
              class="inspirations-categories-label"
            >
              <span>Categories</span>
              <img
                :class="openFilter === 'categories' && 'open'"
                src="~/assets/icons/dropdown-arrow.svg"
              />
            </button>

            <transition name="dropdown">
              <div
                class="inspirations-categories"
                v-if="openFilter === 'categories' && inspirationsCategories"
              >
                <NuxtLink
                  :to="
                    localePath({
                      name: 'inspirations',
                      query: {
                        color: $route.query.color,
                      },
                    })
                  "
                  class="inspirations-category"
                  :class="$route.query.category == null && 'selected-category'"
                >
                  ALL
                </NuxtLink>

                <NuxtLink
                  :to="
                    localePath({
                      name: 'inspirations',
                      query: {
                        category: category.slug,
                        color: $route.query.color,
                      },
                    })
                  "
                  class="inspirations-category"
                  :class="
                    $route.query.category == category.slug &&
                    'selected-category'
                  "
                  v-for="category of inspirationsCategories"
                  :key="category.id"
                >
                  {{ category.title }}
                </NuxtLink>
              </div>
            </transition>
          </div>

          <div class="inspirations-filters-categories">
            <button
              @click="toggleDropdown('colors')"
              class="inspirations-categories-label"
            >
              <span>Colors</span>
              <img
                :class="openFilter === 'colors' && 'open'"
                src="~/assets/icons/dropdown-arrow.svg"
              />
            </button>

            <transition name="dropdown">
              <div
                class="inspirations-categories colors"
                v-if="openFilter === 'colors' && inspirationsColors"
              >
                <NuxtLink
                  :to="
                    localePath({
                      name: 'inspirations',
                      query: {
                        category: $route.query.category,
                      },
                    })
                  "
                  class="inspirations-category"
                  :class="$route.query.color == null && 'selected-category'"
                >
                  ALL
                </NuxtLink>

                <NuxtLink
                  :to="
                    localePath({
                      name: 'inspirations',
                      query: {
                        color: color.slug,
                        category: $route.query.category,
                      },
                    })
                  "
                  class="inspirations-category"
                  :class="
                    $route.query.color == color.slug && 'selected-category'
                  "
                  v-for="color of inspirationsColors"
                  :key="color.id"
                >
                  {{ color.title }}
                </NuxtLink>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <SectionInspirationsMasonry
        v-if="inspirations"
        :inspirations="inspirations"
        @openOverlay="toggleOverlay"
      />
    </div>

    <Overlay
      :openOverlay="openOverlay"
      @closeOverlay="openOverlay = false"
      :moodboards="moodboards"
      :inspiration="inspiration"
      overlayType="addInspiration"
    >
      <!-- <ContentFormMoodboard
        v-if="moodboards"
        :moodboards="moodboards"
        :inspiration="inspiration"
      /> -->
    </Overlay>
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
      openFilter: null,
      moodboards: null,
      openOverlay: false,
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
          moodboards,
        } = await $graphql.default.request(query, {
          category: route.query.category,
          color: route.query.color,
        });

        // store.commit("moodboards/");

        const inspirations = inspirationsByCategories;

        return {
          inspirations,
          inspirationsCategories,
          inspirationsColors,
          moodboards,
        };
      }

      // Without filters
      const {
        inspirations,
        inspirationsCategories,
        inspirationsColors,
        moodboards,
      } = await $graphql.default.request(query);

      return {
        inspirations,
        inspirationsCategories,
        inspirationsColors,
        moodboards,
      };
    } catch (error) {
      console.log("ERROR: ", error);
    }
  },

  methods: {
    toggleDropdown(filter) {
      if (this.openFilter === filter) {
        this.openFilter = null;
      } else {
        this.openFilter = filter;
      }
    },

    toggleOverlay(inspiration) {
      this.inspiration = inspiration;
      this.openOverlay = true;
    },

    async fetchInspirations() {
      const category = this.$route.query.category;
      const color = this.$route.query.color;

      if (!category && !color) {
        const { inspirations } = await this.$graphql.default.request(query);

        this.inspirations = inspirations;
        return;
      }

      const { inspirationsByCategories } = await this.$graphql.default.request(
        query,
        {
          category: category,
          color: color,
        }
      );

      this.inspirations = inspirationsByCategories;
    },
  },

  watch: {
    "$route.query": {
      deep: true,
      handler() {
        this.fetchInspirations();
      },
    },

    moodboards: {
      deep: true,
      handler(e) {
        console.log("WATCH MOODBOARDS; ", e);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.inspirations {
  .inspirations-container {
    @apply border-t
      border-black;

    .inspirations-filters {
      @apply flex
        justify-between
        w-full
        px-4
        py-5
        uppercase
        
        md:px-5;

      .filters {
        @apply flex
          gap-x-5;

        .inspirations-filters-categories {
          @apply relative;

          .inspirations-categories-label {
            @apply flex
              justify-center
              items-center
              gap-x-2
              uppercase;

            span {
              @apply underline;
              text-underline-position: under;
            }

            img {
              @apply transition-transform;

              &.open {
                @apply transform
                rotate-180;
              }
            }
          }

          .inspirations-categories {
            @apply flex
              flex-col
              absolute
              w-max
              top-6
              px-2
              py-1
              z-10
              bg-white;

            &.colors {
              @apply w-max
                right-0;
            }

            .inspirations-category {
              @apply flex
                uppercase
                text-left
                transition-colors;

              &:hover,
              &.selected-category {
                @apply text-gray-primary;
              }
            }
          }
        }
      }
    }
  }
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
