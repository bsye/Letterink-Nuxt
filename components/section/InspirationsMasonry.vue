<template>
  <transition
    name="inspirations-masonry"
    style="padding-left: 1rem;padding-right: 1rem;"
    mode="out-in"
  >
    <MasonryWall
      :items="inspirations"
      :ssr-columns="1"
      :column-width="columnsWidth"
      :gap="gap"
      class="inspirations-masonry"
      :responsive="true"
      v-if="inspirations && inspirations.length"
      key="inspirations"
    >
      <template #default="{ item }">
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
      {{ $t('board.notFound') }}
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

  data() {
    return {
      columnsWidth: this.$masonryResponsive(390),
      gap: 24,
    };
  },

  async mounted() {
    await this.$nextTick();
    if (window.innerWidth < 768) this.gap = 16;
    else this.gap = 24;
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) this.gap = 16;
      else this.gap = 24;
      this.columnsWidth = this.$masonryResponsive(390);
    });
  },
};
</script>

<style lang="scss" scoped>
.inspirations-masonry {
  @apply
    px-4
    md:px-5;

  &::v-deep {
    .masonry-column {
      @apply
        flex-grow-0;

      .masonry-item {
        @apply
          w-auto;
      }
    }
  }
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