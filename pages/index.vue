<template>
  <div class="p-8">
    <h1 class="font-bold text-2xl mb-8">Rick and Morty Characters</h1>
    
    <div class="grid grid-cols-3 gap-8" v-if="inspirations">

      <article
        v-for="inspiration in inspirations"
        :key="inspiration.id"
        class="flex flex-col items-start"
      >
        <h2 class="font-bold">{{ inspiration.title }}</h2>
        <figure v-for="image in inspiration.image" :key="image.id">
          <img :src="image.url" />
        </figure>
        <NuxtLink
          :to="`/inspirations/${inspiration.slug}`"
          class="border rounded px-2 py-1 text-gray-800 border-gray-800 text-sm mt-2"
        >
          Read more
        </NuxtLink>
      </article>
    </div>
  </div>
</template>

<script>
import allInspiration from '~/graphql/queries/allInspiration'

export default {
  apollo: {
    inspirations: {
      query: allInspiration,
      prefetch: true,
    },
  },

}
</script>
