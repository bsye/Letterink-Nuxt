<template>
  <transition
    name="inspirations-masonry"
    mode="out-in"
  >
    <grid-layout
      :layout.sync="layout"
      :cols="this.colNum"
      :row-height="0.25"
      :is-draggable="false"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="false"
      class="inspirations-masonry"
      :responsive="true"
      v-if="inspirations && inspirations.length"
      key="inspirations"
    >
      <grid-item
        :x="layout[index].x"
        :y="layout[index].y"
        :w="layout[index].w"
        :h="layout[index].h"
        :i="layout[index].i"
        class="grid-item"
        v-for="(inspiration,index) of inspirations"
        :key="index"
      >
        <TeaserUserInspiration
          ref="inspiration"
          :inspiration="inspiration"
        />
      </grid-item>
    </grid-layout>

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
import VueGridLayout from "vue-grid-layout";

export default {
  data() {
    return {
      index: 0,
      layout: [],
      colNum: {
        xxs: 1,
        xs: 1,
        sm: 2,
        md: 3,
        lg: 3,
      },
    };
  },

  created() {
    this.inspirations.forEach((inspiration, index) => {
      this.layout.push({
        x: (this.layout.length * 2) % (this.colNum.md || 12),
        y: this.layout.length + (this.colNum.md || 12),
        w: 1,
        h: 0,
        i: this.index,
      });

      this.index++;
    });
  },

  mounted() {
    this.$nextTick();
    const resizeObserver = new ResizeObserver((entries) => {
      entries.forEach((entry, index) => {
        this.layout[index].h = entry.target.clientHeight / 10;
      });
    });

    this.$refs.inspiration &&
      this.$refs.inspiration.forEach((single, index) => {
        resizeObserver.observe(single.$el);
      });
  },

  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
  },

  props: {
    inspirations: Array,
  },
};
</script>

<style lang="scss" scoped>
.inspirations-not-found {
  @apply w-full
    flex
    justify-center
    items-center
    font-sans
    uppercase
    text-2xl;

  min-height: 40vh;

  @screen md {
    min-height: 80vh;
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