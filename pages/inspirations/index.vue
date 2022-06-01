<template>
  <div class="inspirations">
    <div class="inspirations-moodboards" v-if="moodboards">
      <div class="inspirations-moodboards-label">Inspirational Moodboard</div>

      <div class="inspirations-moodboards-content">
        <NuxtLink
          :to="
            localePath({
              name: 'inspirations-slug',
              params: { slug: moodboard.slug },
            })
          "
          class="moodboard"
          v-for="moodboard of moodboards"
          :key="moodboard.id"
        >
          <div class="moodboard-items" v-if="moodboard.inspirationItems">
            <figure
              class="moodboard-item"
              v-for="item of moodboard.inspirationItems"
              :key="item.id"
            >
              <img v-if="item.image.length" :src="item.image[0].url" />
            </figure>
          </div>

          <div class="moodboard-info">
            <div class="moodboard-title" v-if="moodboard.title">
              {{ moodboard.title }}
            </div>

            <div class="moodboard-counter">
              {{ moodboard.inspirationItems.length }} Images
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>

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
                class="inspirations-categories"
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
        @openOverlay="openOverlay = true"
      />
    </div>

    <Overlay :openOverlay="openOverlay" @closeOverlay="openOverlay = false">
      <ContentFormMoodboard v-if="moodboards" :moodboards="moodboards" />
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
    };
  },

  async asyncData({ $graphql, route }) {
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
  },
};
</script>

<style lang="scss" scoped>
.inspirations {
  .inspirations-moodboards {
    @apply pb-16;

    .inspirations-moodboards-label {
      @apply uppercase
        text-sm
        font-cabinet-grotesk
        w-full
        text-center
        py-5;
    }

    .inspirations-moodboards-content {
      @apply flex
        justify-center
        gap-x-5;

      .moodboard {
        @apply flex
          flex-col
          gap-y-5;

        .moodboard-items {
          @apply grid
            grid-cols-2
            grid-rows-2
            gap-1;
          height: 13.5rem;
          width: 13.5rem;

          .moodboard-item {
            @apply w-full;

            img {
              @apply w-full
                h-full
                object-cover;
            }

            &:nth-child(n + 5) {
              @apply hidden;
            }
          }
        }

        .moodboard-info {
          @apply flex
            flex-col
            justify-center
            items-center
            gap-y-1
            uppercase
            text-sm
            font-cabinet-grotesk;

          .moodboard-counter {
            @apply text-gray-primary;
          }
        }
      }
    }
  }

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
              w-full
              top-6
              px-2
              py-1
              z-10
              bg-white;

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

    // .inspirations-content {
    //   @apply flex
    //     flex-col
    //     px-4

    //     md:block
    //     md:px-5;

    //   @screen md {
    //     column-count: auto;
    //     column-gap: 1.25rem;
    //     column-width: 18.75rem;
    //   }

    //   @screen xl {
    //     column-width: 25rem;
    //   }

    //   .inspiration {
    //     @apply mb-10
    //       w-full;

    //     break-inside: avoid;

    //     figure {
    //       @apply w-full
    //         relative
    //         cursor-pointer;

    //       &:hover {
    //         .add-inspiration-btn {
    //           @apply opacity-0;
    //         }

    //         .inspiration-veil {
    //           @apply opacity-100;
    //         }
    //       }

    //       img {
    //         @apply w-full
    //           object-cover;
    //       }

    //       .add-inspiration-btn {
    //         @apply rounded-full
    //           bg-black
    //           w-6
    //           h-6
    //           absolute
    //           top-2
    //           right-2
    //           p-1
    //           transition-opacity;
    //       }

    //       .inspiration-veil {
    //         @apply absolute
    //           inset-0
    //           w-full
    //           h-full
    //           bg-black
    //           bg-opacity-70
    //           flex
    //           justify-center
    //           items-center
    //           opacity-0
    //           pointer-events-none
    //           transition-opacity;

    //         .cross {
    //           @apply w-1/3;
    //         }
    //       }
    //     }

    //     .inspiration-info {
    //       @apply flex
    //         flex-col
    //         justify-center
    //         items-center
    //         w-full
    //         uppercase
    //         font-cabinet-grotesk
    //         text-sm
    //         py-5
    //         gap-y-2;

    //       .inspiration-url {
    //         @apply text-gray-primary;
    //       }
    //     }
    //   }
    // }

    // .inspirations-not-found {
    //   @apply w-full
    //     flex
    //     justify-center
    //     items-center
    //     font-cabinet-grotesk
    //     uppercase
    //     text-2xl;
    //   min-height: 80vh;
    // }
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

// .inspirations-content-enter-active,
// .inspirations-content-leave-active {
//   transition: opacity 0.3s;
// }
// .inspirations-content-enter,
// .inspirations-content-leave-to {
//   opacity: 0;
// }
</style>
