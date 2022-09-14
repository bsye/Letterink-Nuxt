<template>
  <div class="section">
    <div class="router">
      <NuxtLink
        class="back"
        :to="back"
      >
        <img src="~/assets/icons/arrow.svg" />
      </NuxtLink>
      <h3>{{ section }}</h3>
      <div></div>
    </div>

    <div
      class="title"
      v-if="title"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: false,
    },

    back: {
      type: String,
      required: true,
    },

    section: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.section {
  @apply font-sans
      uppercase
      flex
      flex-col
      items-center

      md:px-5;

  .router {
    @apply pt-5
        px-4
        w-full
        grid
        grid-flow-col-dense
        justify-between
        text-sm
        md:px-0;

    h3 {
      @apply
        opacity-50
        md:opacity-100;
    }

    .back {
      @apply
        -m-5
        p-5;

      img {
        @apply
          rotate-180;
      }
    }
  }

  .title {
    @apply text-42
        text-center
        py-6

        md:py-0
        md:mt-5
        md:text-100;
    line-height: initial;
  }
}
</style>