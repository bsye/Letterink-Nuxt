<template>
  <div
    class="single-work"
    v-if="work"
  >
    <div class="hero">
      <div class="cover">
        <figure>
          <img :src="workCoverImage || 'https://picsum.photos/id/1022/500/'" />
        </figure>
        <div class="title">{{ work.title }}</div>
      </div>

      <div class="hero-content">
        <div class="about">
          <div class="about-label">About</div>
          <div
            v-if="work.description"
            v-html="work.description"
          ></div>
        </div>

        <div class="info">
          <div
            class="more-info"
            v-if="$get(work, 'workCategories') || work.text"
          >
            <div
              class="categories"
              v-if="$get(work, 'workCategories')"
            >
              <div class="categories-label">Categories:</div>
              <div class="categories-container">
                <NuxtLink
                  v-for="category of $get(work, 'workCategories')"
                  :key="category.id"
                  :to="
                    localePath({
                      name: 'works',
                      query: { category: category.slug },
                    })
                  "
                  class="category"
                >
                  {{ category.title }}
                </NuxtLink>
              </div>
            </div>

            <div
              class="date"
              v-if="work.text"
            >
              <div class="date-label">Year:</div>
              <div class="year">{{ work.text }}</div>
            </div>
          </div>

          <div class="collaborators">
            <div class="collaborators-label">Collaborator:</div>
            <div
              class="collaborators-container"
              v-if="$get(work, 'table')"
            >
              <a
                class="collaborator"
                v-for="collaborator of $get(work, 'table')"
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
      v-if="$get(work, 'workContent')"
    >
      <ContentImageRow
        :content="workContent"
        v-for="(workContent, index) of $get(work, 'workContent')"
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

      console.log(
        await $graphql.default.request(query, {
          slug: params.slug,
        })
      );

      return { work };
    } catch (error) {
      console.log("ERROR: ", error);
    }
  },

  computed: {
    workCoverImage() {
      return this.$get(this.work, "image[0].url");
    },
  },
};
</script>

<style lang="scss" scoped>
.single-work {
  .hero {
    .cover {
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

      .title {
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

    .hero-content {
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

      .about {
        @apply flex
            flex-col
            gap-y-4;

        max-width: 20.875rem;

        .about-label {
          @apply font-bold;
        }
      }

      .info {
        @apply flex
            flex-col
            gap-y-10
            
            md:flex-row;

        .more-info {
          @apply flex
            flex-col
            gap-y-10
            
            md:w-full;

          @screen md {
            width: 20.875rem;
          }

          .categories {
            @apply flex
                flex-col
                gap-y-5;

            .categories-label {
              @apply font-bold;
            }

            .categories-container {
              @apply flex
                gap-x-2
                gap-y-5;

              .category {
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

          .date {
            @apply flex
                flex-col
                gap-y-5;

            .date-label {
              @apply font-bold;
            }
          }
        }

        .collaborators {
          @apply flex
            flex-col
            gap-y-5
            
            md:w-full;

          @screen md {
            width: 20.875rem;
          }

          .collaborators-label {
            @apply font-bold;
          }

          .collaborators-container {
            @apply flex
                flex-col;

            .collaborator {
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

  .content {
    @apply px-5
      flex
      flex-col;

    .row {
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