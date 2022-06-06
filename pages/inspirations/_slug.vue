<template>
  <div class="single-moodboard">
    <div class="single-moodboard-header">
      <div class="single-moodboard-header-label">Inspirational moodbaord</div>

      <div class="single-moodboard-header-title" v-if="moodboard.title">
        {{ moodboard.title }}
      </div>

      <div class="single-moodboard-header-footer">
        <div class="inspirations-counter" v-if="moodboard.inspirationItems">
          {{ moodboard.inspirationItems.length }} Images
        </div>

        <div class="single-moodboard-header-actions"></div>
      </div>
    </div>

    <div class="single-moodboard-content">
      <SectionInspirationsMasonry
        v-if="moodboard.inspirationItems"
        :inspirations="moodboard.inspirationItems"
      />
    </div>
  </div>
</template>

<script>
import query from "~/graphql/queries/singleMoodboard";

export default {
  data() {
    return {
      moodboard: null,
    };
  },

  mounted() {
    console.log("MOODBOARD: ", this.moodboard);
  },

  async asyncData({ $graphql, params }) {
    try {
      const { moodboard } = await $graphql.default.request(query, {
        slug: params.slug,
      });

      console.log("OK: ", moodboard);

      return { moodboard };
      // if (moodboard) {
      //   return { moodboard };
      // } else {
      //   this.$nuxt.error({ statusCode: 404 });
      // }
    } catch (error) {
      console.log("ERROR: ", error);
    }
  },

  // async fetch() {
  //   const { moodboard } = await this.$graphql.default.request(query, {
  //     slug: this.$route.params.slug,
  //   });

  //   if (entry) {
  //     this.inspiration = entry;
  //   } else {
  //     this.$nuxt.error({ statusCode: 404 });
  //   }
  // },
};
</script>

<style lang="scss" scoped>
.single-moodboard {
  @apply pt-5;

  .single-moodboard-header {
    @apply font-cabinet-grotesk
      uppercase
      flex
      flex-col
      items-center
      px-4
      
      md:px-5;

    .single-moodboard-label {
      @apply py-5
        text-sm;
    }

    .single-moodboard-header-title {
      @apply text-100;
    }

    .single-moodboard-header-footer {
      @apply py-5
        text-sm
        w-full
        flex
        justify-between;

      .inspirations-counter {
        @apply text-gray-primary;
      }
    }
  }
}
</style>
