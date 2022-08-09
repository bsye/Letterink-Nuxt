<template>
  <div
    class="single-work"
    v-if="work"
  >
    <div class="single-work-hero">
      <div class="single-work-cover">
        <figure>
          <img :src="workCoverImage || 'https://picsum.photos/id/1022/500/'" />
        </figure>
        <div class="single-work-title">{{ work.title }}</div>
      </div>

      <div class="single-work-hero-content">
        <div class="single-work-about">
          <div class="single-work-about-label">About</div>
          <div
            v-if="work.description"
            v-html="work.description"
          ></div>
        </div>

        <div class="single-work-info">
          <div
            class="single-work-more-info"
            v-if="workCategories || work.text"
          >
            <div
              class="single-work-categories"
              v-if="workCategories"
            >
              <div class="single-work-categories-label">Categories:</div>
              <div class="single-work-categories-container">
                <NuxtLink
                  :to="
                    localePath({
                      name: 'works',
                      query: { category: category.slug },
                    })
                  "
                  class="single-work-category"
                  v-for="category of workCategories"
                  :key="category.id"
                >
                  {{ category.title }}
                </NuxtLink>
              </div>
            </div>

            <div
              class="single-work-date"
              v-if="work.text"
            >
              <div class="single-work-date-label">Year:</div>
              <div class="single-work-year">{{ work.text }}</div>
            </div>
          </div>

          <div class="single-work-collaborators">
            <div class="single-work-collaborators-label">Collaborator:</div>
            <div
              class="single-work-collaborators-container"
              v-if="workCollaborators"
            >
              <a
                class="single-work-collaborator"
                v-for="collaborator of workCollaborators"
                :key="collaborator.id"
                :href="collaborator.urlCollaborator"
                target="_blank"
              >
                <span>{{ collaborator.label }}:</span>
                {{ collaborator.collaboratorName }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="single-work-content"
      v-if="workContents"
    >
      <ContentImageRow
        :row="workContent"
        v-for="(workContent, index) of workContents"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import query from "~/graphql/queries/singleWork";

export default {
  data() {
    return {
      work: null,
    };
  },

  async asyncData({ $graphql, params }) {
    try {
      const { work } = await $graphql.default.request(query, {
        slug: params.slug,
      });

      return { work };
    } catch (error) {
      console.log("ERROR: ", error);
    }
  },

  computed: {
    workCoverImage() {
      if (this.work && this.work.image.length) {
        return this.work.image[0].url;
      }
      return null;
    },

    workCategories() {
      if (
        this.work &&
        this.work.workCategories &&
        this.work.workCategories.length
      ) {
        return this.work.workCategories;
      }

      return null;
    },

    workCollaborators() {
      if (this.work && this.work.table && this.work.table.length) {
        return this.work.table;
      }

      return null;
    },

    workContents() {
      if (
        this.work &&
        this.work.projectBlocks &&
        this.work.projectBlocks.length
      ) {
        return this.work.projectBlocks;
      }

      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.single-work {
  .single-work-hero {
    .single-work-cover {
      @apply h-screen
        relative;

      figure {
        @apply w-full
        h-full;

        img {
          @apply w-full
        h-full
        object-cover;
        }
      }

      .single-work-title {
        @apply absolute
        top-1/2
        left-1/2
        transform
        -translate-x-1/2
        -translate-y-1/2
        text-white
        text-42
        uppercase
        font-sans
        text-center
        w-full
        px-4
        
        md:text-100
        md:px-40;
      }
    }

    .single-work-hero-content {
      @apply p-5
        flex
        flex-col
        gap-y-5
        uppercase
        font-sans
        text-sm
        
        md:flex-row
        md:justify-between
        md:pb-40;

      .single-work-about {
        @apply flex
            flex-col
            gap-y-4;

        max-width: 20.875rem;

        .single-work-about-label {
          @apply font-bold;
        }
      }

      .single-work-info {
        @apply flex
            flex-col
            gap-y-10
            
            md:flex-row;

        .single-work-more-info {
          @apply flex
            flex-col
            gap-y-10
            
            md:w-full;

          @screen md {
            width: 20.875rem;
          }

          .single-work-categories {
            @apply flex
                flex-col
                gap-y-5;

            .single-work-categories-label {
              @apply font-bold;
            }

            .single-work-categories-container {
              @apply flex
                gap-x-2
                gap-y-5;

              .single-work-category {
                @apply underline
                    relative;
                text-underline-position: under;

                &:not(:last-child)::after {
                  @apply ml-2
                    inline-block;
                  content: "/";
                }
              }
            }
          }

          .single-work-date {
            @apply flex
                flex-col
                gap-y-5;

            .single-work-date-label {
              @apply font-bold;
            }
          }
        }

        .single-work-collaborators {
          @apply flex
            flex-col
            gap-y-5
            
            md:w-full;

          @screen md {
            width: 20.875rem;
          }

          .single-work-collaborators-label {
            @apply font-bold;
          }

          .single-work-collaborators-container {
            @apply flex
                flex-col;

            .single-work-collaborator {
              @apply flex
                gap-x-1;

              span {
                @apply font-bold;
              }
            }
          }
        }
      }
    }
  }

  .single-work-content {
    @apply px-5
      flex
      flex-col;

    .single-work-row {
      @apply flex
        flex-col
        gap-y-4
        
        md:flex-row
        md:gap-x-5;

      figure {
        @apply w-full;

        img {
          @apply w-full
            object-cover;
        }
      }
    }
  }
}
</style>