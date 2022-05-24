<template>
  <div class="single-work">
    <div class="single-work-hero">
      <div class="single-work-cover">
        <figure>
          <img src="https://picsum.photos/id/1022/500/" />
        </figure>
        <div class="single-work-title">TITLE</div>
      </div>

      <div class="single-work-hero-content">
        <div class="single-work-about">
          <div class="single-work-about-label">About</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          porro earum soluta, est corporis incidunt! Qui suscipit repudiandae
          cum rerum dolor iste, rem dolorem quisquam enim ad nam placeat?
          Architecto?
        </div>

        <div class="single-work-info">
          <div class="single-work-more-info">
            <div class="single-work-categories">
              <div class="single-work-categories-label">Categories:</div>
              <div class="single-work-categories-container">
                <div class="single-work-category">Category</div>
                <div class="single-work-category">Category</div>
              </div>
            </div>

            <div class="single-work-date">
              <div class="single-work-date-label">Year:</div>
              <div class="single-work-year">2022</div>
            </div>
          </div>

          <div class="single-work-collaborators">
            <div class="single-work-collaborators-label">Collaborator:</div>
            <div class="single-work-collaborators-container">
              <a class="single-work-collaborator" href="#" target="_blank">
                <span>Photo:</span>
                lorem ipsum dolor
              </a>

              <a class="single-work-collaborator" href="#" target="_blank">
                <span>design by:</span>
                letterink
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
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
        text-sm;

      .single-work-about {
        @apply flex
            flex-col
            gap-y-4;

        .single-work-about-label {
          @apply font-bold;
        }
      }

      .single-work-info {
        @apply flex
            flex-col
            gap-y-10;

        .single-work-more-info {
          @apply flex
            flex-col
            gap-y-10;

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
            gap-y-5;

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
                    @apply font-bold
                }
            }
          }
        }
      }
    }
  }
}
</style>