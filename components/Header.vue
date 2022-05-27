<template>
  <div class="header">
    <NuxtLink class="logo" :to="localePath({ name: 'index' })">
      letterink
    </NuxtLink>

    <div class="links"></div>

    <div class="header-right">
      <NuxtLink
        :to="localePath({ name: 'index' })"
        class="inspirations-counter"
      >
        <span>ispirations</span>
        <div class="counter">0</div>
      </NuxtLink>

      <div class="languages">
        <NuxtLink to="#">it</NuxtLink>
        <NuxtLink to="#">en</NuxtLink>
      </div>

      <button class="menu-open">Menu</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  @apply h-54
    bg-white
    flex
    justify-between
    items-center
    text-sm
    font-cabinet-grotesk
    font-bold
    uppercase
    px-4
    
    md:font-normal;

  .links {
    @apply hidden;
  }

  .header-right {
    @apply flex
      gap-x-4
      
      md:gap-x-2;

    .inspirations-counter {
      @apply flex
        items-center
        gap-x-2;

      span {
        @apply hidden
          underline
        
          md:flex;

        @screen md {
          text-underline-position: under;
        }
      }

      .counter {
        @apply rounded-full
          bg-black
          text-white
          h-6
          w-6
          flex
          justify-center
          items-center;
      }
    }

    .languages {
      @apply hidden
        gap-x-1
        items-center
      
        md:flex;

      a {
        &:not(:last-child)::after {
          @apply ml-1
          inline-block;
          content: "/";
        }
      }
    }

    .menu-open {
      @apply uppercase
        font-bold
        
        md:hidden;
    }
  }
}
</style>