<template>
  <transition
    name="inspirations-masonry"
    mode="out-in"
  >
    <MasonryWall
      :items="inspirations"
      :ssr-columns="1"
      ref="masonry"
      :gap="20"
      :column-width="500"
      class="inspirations-masonry"
      :responsive="true"
      v-if="inspirations && inspirations.length"
      key="inspirations"
    >
      <template
        class="masonry"
        #default="{ item, index }"
      >
        <TeaserUserInspiration
          :key="item.id"
          ref="inspiration"
          :sort="index"
          :id="item.id"
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
import dragula from "dragula";

export default {
  components: {
    MasonryWall,
  },

  async mounted() {
    await this.$nextTick();
    let columns = document.querySelectorAll(".masonry-column");
    const drake = dragula();

    this.$handleMasonryResize(columns, drake);

    let oldOrder = [];
    drake.on("drag", () => {
      oldOrder = [];
      const elements = document.querySelectorAll(
        ".masonry-column .inspiration"
      );
      oldOrder = this.$getElementsOrder(elements);
    });

    drake.on("dragend", () => {
      let order = [];

      this.$rearrangeColumns(columns);
      const elements = document.querySelectorAll(
        ".masonry-column .inspiration"
      );
      order = this.$getElementsOrder(elements);
      order = this.$orderElements(order, oldOrder);

      this.$store.dispatch("moodboards/orderInspirations", { order });
    });
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
    justify-center
    items-center
    absolute
    top-0
    bottom-0
    font-sans
    uppercase
    text-2xl;
}

.inspirations-masonry {
  &::v-deep {
    .masonry-column {
      &.empty {
        @apply
          min-h-[400px];
      }
    }
  }
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