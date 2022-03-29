<template>
  <div class="p-8">
    <nuxt-link to="/inspirations" class="border rounded px-2 py-1 text-gray-800 border-gray-800 text-sm mt-2 mb-10">Back</nuxt-link>
    <div class="grid grid-cols-3 gap-8" v-if="inspiration">

      <h1 class="font-bold">{{ inspiration.title }}</h1>

      <figure v-for="image in inspiration.image" :key="image.id">
        <img :src="image.url" />
      </figure>
      <hr />

      <div v-html="inspiration.description"></div>
    </div>


  </div>
</template>

<script>
import singleInspirtion from '~/graphql/queries/singleInspirtion'

export default {
  data() {
    return {
      inspiration: null,
    }
  },

  async fetch() {
    const { data } = await this.$apollo.query({
      query: singleInspirtion,
      prefetch: true,
      variables: {
        slug: this.$route.params.slug
      }
    })

    this.inspiration = data.inspiration
  },
}
</script>
