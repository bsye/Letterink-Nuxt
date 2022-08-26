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
      :column-width="700"
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
          :ref="`inspiration-${index}`"
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
    const columns = document.querySelectorAll(".masonry-column");
    const drake = dragula();

    columns.forEach((column) => {
      drake.containers.push(column);
    });

    drake.on("dragend", () => {
      let newOrder = [];
      columns.forEach((column, index) => {
        if (column.childNodes.length == 0) {
          let currentIndex = index;
          let found = false;
          let element = false;
          if (currentIndex == 0) {
            do {
              if (columns[index + 1].childNodes.length > 1) {
                found = index + 1;
                element =
                  columns[found].childNodes[
                    columns[found].childNodes.length - 1
                  ];
              }
              currentIndex++;
            } while (currentIndex < columns.length - 1);

            column.appendChild(element);
          } else {
            do {
              if (columns[index - 1].childNodes.length > 1) {
                found = index - 1;
                element =
                  columns[found].childNodes[
                    columns[found].childNodes.length - 1
                  ];
              }
              currentIndex--;
            } while (currentIndex > 0);

            column.appendChild(element);
          }
        }
      });

      console.log(this.$refs);
      // this.$store.dispatch("moodboards/orderInspirations", { order: newOrder });
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
    px-5;
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