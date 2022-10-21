<template>
  <div class="filters">
    <div class="label">{{ $t("filters.filters") }}</div>

    <div class="inner">
      <div class="dropdown">
        <button @click="toggleDropdown('categories')" class="label">
          <span>{{ $t("filters.categories") }}</span>
          <img
            :class="openFilter === 'categories' && 'open'"
            src="~/assets/icons/dropdown-arrow.svg"
          />
        </button>

        <transition name="dropdown">
          <div
            class="categories"
            v-if="openFilter === 'categories' && categories"
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
              class="category"
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
              class="category"
              :class="
                $route.query.category == category.slug && 'selected-category'
              "
              v-for="category of categories"
              :key="category.id"
            >
              {{ category.title }}
            </NuxtLink>
          </div>
        </transition>
      </div>

      <div class="dropdown">
        <button @click="toggleDropdown('colors')" class="label">
          <span>{{ $t("filters.colors") }}</span>
          <img
            :class="openFilter === 'colors' && 'open'"
            src="~/assets/icons/dropdown-arrow.svg"
          />
        </button>

        <transition name="dropdown">
          <div
            class="categories colors"
            v-if="openFilter === 'colors' && colors"
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
              class="category"
              :class="$route.query.color == null && 'selected-category'"
            >
              {{ $t("filters.all") }}
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
              class="category"
              :class="$route.query.color == color.slug && 'selected-category'"
              v-for="color of colors"
              :key="color.id"
            >
              {{ color.title }}
            </NuxtLink>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      openFilter: null,
    };
  },

  props: {
    colors: {
      type: Array,
    },

    categories: {
      type: Array,
    },
  },

  methods: {
    toggleDropdown(filter) {
      if (this.openFilter === filter) {
        this.openFilter = null;
      } else {
        this.openFilter = filter;
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .filters {
    @apply flex
      justify-between
      w-full
      px-4
      text-sm
      border-t
      border-black
      py-4
      md:py-5
      uppercase

      md:px-5;

    .inner {
      @apply flex
        gap-x-4
        md:gap-x-5;

      .dropdown {
        @apply relative;

        .label {
          @apply flex
            justify-center
            items-center
            gap-x-2
            uppercase;

          img {
            @apply transition-transform;

            &.open {
              @apply transform
              rotate-180;
            }
          }
        }

        .categories {
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

          .category {
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
</style>