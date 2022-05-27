<template>
  <div class="single-work" v-if="singleWork">
    <div class="single-work-hero">
      <div class="single-work-cover">
        <figure>
          <img :src="workCoverImage || 'https://picsum.photos/id/1022/500/'" />
        </figure>
        <div class="single-work-title">{{ singleWork.title }}</div>
      </div>

      <div class="single-work-hero-content">
        <div class="single-work-about">
          <div class="single-work-about-label">About</div>
          <div
            v-if="singleWork.description"
            v-html="singleWork.description"
          ></div>
        </div>

        <div class="single-work-info">
          <div
            class="single-work-more-info"
            v-if="workCategories || singleWork.text"
          >
            <div class="single-work-categories" v-if="workCategories">
              <div class="single-work-categories-label">Categories:</div>
              <div class="single-work-categories-container">
                <div
                  class="single-work-category"
                  v-for="category of workCategories"
                  :key="category.id"
                >
                  {{ category.title }}
                </div>
              </div>
            </div>

            <div class="single-work-date" v-if="singleWork.text">
              <div class="single-work-date-label">Year:</div>
              <div class="single-work-year">{{ singleWork.text }}</div>
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

    <div class="single-work-content" v-if="workContents">
      <ContentImageRow
        :row="workContent"
        v-for="(workContent, index) of workContents"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      work: {
        data: {
          entry: {
            title: "PHIL & NICOLE",
            slug: "phil-nicole",
            description:
              "<p>RUSSELL WESTBROOK AND JORDAN FUNDED AND PRODUCED A FILM TO SHOW HOW YOUNG BALLERS IN CRENSHAW DECIDED TO LEAVE THE HOOD THROUGH TECH SCHOLARSHIPS. WE HELPED CREATED THE DESIGN AESTHETIC FOR THIS EXCITING PROJECT AND EVEN DEVELOPED A CLOTHING LINE.</p>",
            text: "2022",
            image: [],
            imagesLimited: [],
            workCategories: [
              {
                id: "162",
                title: "Wedding",
              },
              {
                id: "163",
                title: "Letterpress",
              },
            ],
            table: [
              {
                id: "52",
                label: "Photo",
                collaboratorName: "LOREM IPSUM DOLOR DESING BY: LETTERINK",
                urlCollaborator: null,
              },
              {
                id: "53",
                label: "Design by",
                collaboratorName: "Letterink",
                urlCollaborator: null,
              },
            ],
            projectBlocks: [
              {
                __typename: "projectBlocks_text_BlockType",
                textContent: null,
                maxWidth: "medium",
              },
              {
                __typename: "projectBlocks_spacer_BlockType",
                spacer: "medium",
              },
              {
                __typename: "projectBlocks_imageColumns_BlockType",
                images: [
                  {
                    id: "84",
                    image: [
                      {
                        id: "99",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-54.png",
                      },
                    ],
                    width: "full",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                  },
                  {
                    id: "133",
                    image: [
                      {
                        id: "103",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-55.png",
                      },
                    ],
                    width: "full",
                    horizontalAlignment: "center",
                    verticalAlignment: "top",
                  },
                ],
              },
              {
                __typename: "projectBlocks_spacer_BlockType",
                spacer: "medium",
              },
              {
                __typename: "projectBlocks_imageColumns_BlockType",
                images: [
                  {
                    id: "136",
                    image: [
                      {
                        id: "113",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-56.png",
                      },
                    ],
                    width: "full",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                  },
                  {
                    id: "137",
                    image: [
                      {
                        id: "118",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-57.png",
                      },
                    ],
                    width: "full",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                  },
                ],
              },
              {
                __typename: "projectBlocks_spacer_BlockType",
                spacer: "medium",
              },
              {
                __typename: "projectBlocks_imageColumns_BlockType",
                images: [
                  {
                    id: "140",
                    image: [
                      {
                        id: "125",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-58.png",
                      },
                    ],
                    width: "small",
                    horizontalAlignment: "left",
                    verticalAlignment: "center",
                  },
                ],
              },
              {
                __typename: "projectBlocks_spacer_BlockType",
                spacer: "medium",
              },
              {
                __typename: "projectBlocks_imageColumns_BlockType",
                images: [
                  {
                    id: "293",
                    image: [
                      {
                        id: "272",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-59.png",
                      },
                    ],
                    width: "small",
                    horizontalAlignment: "right",
                    verticalAlignment: "center",
                  },
                ],
              },
              {
                __typename: "projectBlocks_spacer_BlockType",
                spacer: "medium",
              },
              {
                __typename: "projectBlocks_imageColumns_BlockType",
                images: [
                  {
                    id: "540",
                    image: [
                      {
                        id: "312",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-60.png",
                      },
                    ],
                    width: "full",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                  },
                ],
              },
              {
                __typename: "projectBlocks_spacer_BlockType",
                spacer: "medium",
              },
              {
                __typename: "projectBlocks_imageColumns_BlockType",
                images: [
                  {
                    id: "543",
                    image: [
                      {
                        id: "314",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-62.png",
                      },
                    ],
                    width: "small",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                  },
                  {
                    id: "544",
                    image: [
                      {
                        id: "313",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-61.png",
                      },
                    ],
                    width: "full",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                  },
                ],
              },
              {
                __typename: "projectBlocks_spacer_BlockType",
                spacer: "medium",
              },
              {
                __typename: "projectBlocks_imageColumns_BlockType",
                images: [
                  {
                    id: "547",
                    image: [
                      {
                        id: "315",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-63.png",
                      },
                    ],
                    width: "full",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                  },
                ],
              },
              {
                __typename: "projectBlocks_spacer_BlockType",
                spacer: "medium",
              },
              {
                __typename: "projectBlocks_imageColumns_BlockType",
                images: [
                  {
                    id: "550",
                    image: [
                      {
                        id: "316",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-64.png",
                      },
                    ],
                    width: "full",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                  },
                  {
                    id: "551",
                    image: [
                      {
                        id: "317",
                        url: "http://letterink:8888/uploads/images/inspiration/Rectangle-65.png",
                      },
                    ],
                    width: "full",
                    horizontalAlignment: "center",
                    verticalAlignment: "center",
                  },
                ],
              },
            ],
          },
        },
      },
    };
  },

  computed: {
    singleWork() {
      if (this.work && this.work.data) return this.work.data.entry;
      return null;
    },

    workCoverImage() {
      if (this.singleWork && this.singleWork.image.length) {
        return this.singleWork.image[0].url;
      }
      return null;
    },

    workCategories() {
      if (
        this.singleWork &&
        this.singleWork.workCategories &&
        this.singleWork.workCategories.length
      ) {
        return this.singleWork.workCategories;
      }

      return null;
    },

    workCollaborators() {
      if (
        this.singleWork &&
        this.singleWork.table &&
        this.singleWork.table.length
      ) {
        return this.singleWork.table;
      }

      return null;
    },

    workContents() {
      if (
        this.singleWork &&
        this.singleWork.projectBlocks &&
        this.singleWork.projectBlocks.length
      ) {
        return this.singleWork.projectBlocks;
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
        font-cabinet-grotesk;
      }
    }

    .single-work-hero-content {
      @apply p-5
        flex
        flex-col
        gap-y-5
        uppercase
        font-cabinet-grotesk
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