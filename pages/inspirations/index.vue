<template>
  <div class="inspirations">
    <div class="inspirations-moodboards"></div>

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
                <button
                  class="inspirations-category"
                  :class="selectedCategory == null && 'selected-category'"
                  @click="selectedCategory = null"
                >
                  ALL
                </button>

                <button
                  class="inspirations-category"
                  :class="
                    selectedCategory == category.slug && 'selected-category'
                  "
                  v-for="category of inspirationsCategories"
                  :key="category.id"
                  @click="selectedCategory = category.slug"
                >
                  {{ category.title }}
                </button>
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
                <button
                  class="inspirations-category"
                  :class="selectedColor == null && 'selected-category'"
                  @click="selectedColor = null"
                >
                  ALL
                </button>

                <button
                  class="inspirations-category"
                  :class="selectedColor == color.slug && 'selected-category'"
                  v-for="color of inspirationsColors"
                  :key="color.id"
                  @click="selectedColor = color.slug"
                >
                  {{ color.title }}
                </button>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div
        class="inspirations-content"
        v-if="inspirations && inspirations.length"
      >
        <div
          class="inspiration"
          v-for="inspiration of inspirations"
          :key="inspiration.id"
        >
          <figure>
            <img
              v-if="inspiration.image.length"
              :src="inspiration.image[0].url"
            />

            <div class="add-inspiration-btn">
              <img class="cross" src="~/assets/icons/cross.svg" />
            </div>

            <div class="inspiration-veil">
              <img class="cross" src="~/assets/icons/cross.svg" />
            </div>
          </figure>

          <div class="inspiration-info">
            <div class="inspiration-title" v-if="inspiration.title">
              {{ inspiration.title }}
            </div>

            <a
              :href="inspiration.buttonLink.url"
              :target="inspiration.buttonLink.target"
              class="inspiration-url"
              v-if="inspiration.buttonLink"
            >
              {{ inspiration.buttonLink.url }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import query from "~/graphql/queries/inspirations/all";
import inspirationByCategoriesQuery from "~/graphql/queries/inspirations/byCategories";

export default {
  data() {
    return {
      inspirations: null,
      inspirationsCategories: null,
      inspirationsColors: null,
      openFilter: null,
      selectedCategory: null,
      selectedColor: null,
    };
  },

  async asyncData({ $graphql }) {
    try {
      const { inspirations, inspirationsCategories, inspirationsColors } =
        await $graphql.default.request(query);
      return { inspirations, inspirationsCategories, inspirationsColors };
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
      const { inspirations } = await this.$graphql.default.request(
        inspirationByCategoriesQuery,
        {
          category: this.selectedCategory,
        }
      );

      if (inspirations) {
        this.inspirations = inspirations;
      } else {
        this.$nuxt.error({ statusCode: 404 });
      }
    },
  },

  // async fetch() {
  //   const { inspirations } = await this.$graphql.default.request(query);

  //   if (inspirations) {
  //     this.inspirations = inspirations;
  //   } else {
  //     this.$nuxt.error({ statusCode: 404 });
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.inspirations {
  @apply h-screen;

  .inspirations-container {
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

    .inspirations-content {
      @apply flex
        flex-col
        px-4
      
        md:block
        md:px-5;

      @screen md {
        column-count: auto;
        column-gap: 1.25rem;
        column-width: 18.75rem;
      }

      @screen xl {
        column-width: 25rem;
      }

      .inspiration {
        @apply mb-10
          w-full;

        break-inside: avoid;

        figure {
          @apply w-full
            relative
            cursor-pointer;

          &:hover {
            .add-inspiration-btn {
              @apply opacity-0;
            }

            .inspiration-veil {
              @apply opacity-100;
            }
          }

          img {
            @apply w-full
              object-cover;
          }

          .add-inspiration-btn {
            @apply rounded-full
              bg-black
              w-6
              h-6
              absolute
              top-2
              right-2
              p-1
              transition-opacity;
          }

          .inspiration-veil {
            @apply absolute
              inset-0
              w-full
              h-full
              bg-black
              bg-opacity-70
              flex
              justify-center
              items-center
              opacity-0
              pointer-events-none
              transition-opacity;

            .cross {
              @apply w-1/3;
            }
          }
        }

        .inspiration-info {
          @apply flex
            flex-col
            justify-center
            items-center
            w-full
            uppercase
            font-cabinet-grotesk
            text-sm
            py-5
            gap-y-2;

          .inspiration-url {
            @apply text-gray-primary;
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
