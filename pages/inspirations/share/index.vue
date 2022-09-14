<template>
  <div
    v-if="moodboard"
    class="single-moodboard"
  >
    <div class="header">
      <div class="header-label-container">
        <span class="header-label">
          {{ $t('board.shared') }}
        </span>
        <span class="inspirations-counter">
          {{ moodboard.inspirationItems.length }} {{ $t('board.images') }}
        </span>
      </div>

      <div
        class="header-title"
        v-if="moodboard.title"
      >
        {{ moodboard.title }}
      </div>

      <div class="header-footer">
        <div
          class="inspirations-counter"
          v-if="moodboard.inspirationItems"
        >
          {{ moodboard.inspirationItems.length }} {{ $t('board.images') }}
        </div>

        <div class="header-actions">
          <ElementButton @click.native="$root.$emit('show-overlay','modal-save-board')">Salva</ElementButton>
        </div>
      </div>
    </div>

    <div class="content">
      <SectionInspirationsMasonry
        v-if="moodboard.inspirationItems"
        :inspirations="moodboard.inspirationItems"
      />
    </div>
  </div>
  <div
    v-else
    class="single-moodboard"
  >
    <div class="header">
      <div class="header-label-container">
        <span class="header-label">
          {{ $t('board.shared') }}
        </span>
      </div>
      <div class="header-title">
        {{ $t('board.notFoundBoard') }}
      </div>
    </div>
    <div class="content not-found">
      {{ $t('board.sharedNotFound') }}
      <NuxtLink :to="localePath({name: 'inspirations'})">
        <ElementButton class="button full white">
          {{ $t('board.goTo') }}
        </ElementButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
import { Base64 } from "js-base64";

export default {
  data() {
    return {
      moodboard: null,
    };
  },

  mounted() {
    const moodboardHash = this.$route.query.hash;
    try {
      const parsed = JSON.parse(Base64.decode(moodboardHash));
      if (this.$get(parsed, "title")) {
        this.moodboard = parsed;
      }
    } catch (error) {
      return false;
    }
  },

  head() {
    return {
      htmlAttrs: {
        class: `dark`,
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.single-moodboard {
  @apply
    md:pt-5
    flex
    flex-grow
    flex-col;

  .content {
    @apply
      grow
      relative;

    &.not-found {
      @apply
        w-full
        flex
        uppercase
        text-xl
        flex-col
        max-w-md
        mx-auto
        text-center
        justify-center
        items-center;

      button {
        @apply
          mt-4;
      }
    }
  }

  .header {
    @apply font-sans
      uppercase
      flex
      flex-col
      items-center
      
      md:px-5;

    .header-label-container {
      @apply py-5
        px-4
        text-sm
        
        md:px-0;

      .header-label {
        @apply hidden

          md:flex;
      }

      .inspirations-counter {
        @apply text-gray-primary
        
          md:hidden;
      }
    }

    .header-title {
      @apply text-42
        text-center
        pt-14
        pb-28

        md:py-0
        md:text-100;
      line-height: initial;
    }

    .header-footer {
      @apply py-5
        text-sm
        w-full
        flex
        justify-center
        border-t
        border-black

        md:border-none
        md:justify-between;

      .inspirations-counter {
        @apply text-gray-primary
          hidden
          
          md:flex;
      }

      .header-actions {
        @apply flex
          gap-x-5;

        button {
          @apply uppercase
            font-sans
            underline;
          text-underline-position: under;

          &:hover {
            @apply md:no-underline;
          }
        }
      }
    }
  }
}
</style>
