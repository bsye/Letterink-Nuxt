<template>
  <a
    :href="link.relation"
    target="_blank"
    v-if="link && link.relation && isCustom"
  >
    <slot />
  </a>

  <NuxtLink
    :to="localePath({ path: link.relation })"
    v-else-if="link && link.relation"
  >
    <slot />
  </NuxtLink>

  <span v-else>
    <slot />
  </span>
</template>

<script>
export default {
  props: {
    link: Object,
  },

  computed: {
    isCustom() {
      if (
        this.link.__typename === "menuItems_custom_BlockType" ||
        this.link.relation.startsWith("http")
      )
        return true;

      return false;
    },
  },
};
</script>