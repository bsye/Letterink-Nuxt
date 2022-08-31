<template>
  <transition
    name="inspirations-masonry"
    mode="out-in"
  >
    <MasonryWall
      :items="inspirations"
      :ssr-columns="1"
      :column-width="500"
      :gap="20"
      class="inspirations-masonry"
      :responsive="true"
      v-if="inspirations && inspirations.length"
      key="inspirations"
    >
      <template #default="{ item, index }">
        <TeaserInspiration
          ref="inspiration"
          :key="item.id"
          :inspiration="item"
        />
      </template>
    </MasonryWall>

    <div
      v-else
      key="no-inspirations"
      class="inspirations-not-found"
    >
      No inspirations found
    </div>
  </transition>
</template>

<script>
import MasonryWall from "@yeger/vue2-masonry-wall";

export default {
  components: {
    MasonryWall,
  },

  props: {
    inspirations: Array,
  },
};
</script>

<style lang="scss" scoped>
.inspirations-masonry {
  @apply
    px-4
    md:px-5;
}

.inspirations-not-found {
  @apply w-full
    flex
    absolute
    top-0
    bottom-0
    justify-center
    items-center
    font-sans
    uppercase
    text-2xl;
}

.inspirations-masonry-enter-active,
.inspirations-masonry-leave-active {
  transition: opacity 0.3s;
}
.inspirations-masonry-enter,
.inspirations-masonry-leave-to {
  opacity: 0;
}
</style>