<template>
  <div class="single-moodboard">
    <div class="single-moodboard-header">
      <div class="single-moodboard-header-label-container">
        <span class="single-moodboard-header-label">
          {{ $t('user.moodboard') }}
        </span>
        <span class="inspirations-counter">
          {{ moodboard.inspirationItems.length }} Images
        </span>
      </div>

      <div
        class="single-moodboard-header-title"
        v-if="moodboard.title"
      >
        {{ moodboard.title }}
      </div>

      <div class="single-moodboard-header-footer">
        <div
          class="inspirations-counter"
          v-if="moodboard.inspirationItems"
        >
          {{ moodboard.inspirationItems.length }} Images
        </div>

        <div class="single-moodboard-header-actions">
          <ElementButton @click.native="$root.$emit('show-overlay','modal-duplicate-board')">Duplica</ElementButton>
          <ElementButton @click.native="$root.$emit('show-overlay','modal-rename-board')">Rinomina</ElementButton>
          <ElementButton @click.native="$root.$emit('show-overlay','modal-share-board')">Condividi</ElementButton>
        </div>
      </div>
    </div>

    <div class="single-moodboard-content">
      <SectionUserInspirationsMasonry
        v-if="moodboard.inspirationItems"
        :inspirations="moodboard.inspirationItems"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    moodboard() {
      const userMoodboard = this.$store.getters[
        "moodboards/getUserMoodboardById"
      ](this.$route.params.id);
      this.$store.dispatch("moodboards/setCurrentMoodboard", userMoodboard);
      return userMoodboard;
    },
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
  @apply md:pt-5;

  .single-moodboard-header {
    @apply font-sans
      uppercase
      flex
      flex-col
      items-center
      
      md:px-5;

    .single-moodboard-header-label-container {
      @apply py-5
        px-4
        text-sm
        
        md:px-0;

      .single-moodboard-header-label {
        @apply hidden

          md:flex;
      }

      .inspirations-counter {
        @apply text-gray-primary
        
          md:hidden;
      }
    }

    .single-moodboard-header-title {
      @apply text-42
        text-center
        pt-14
        pb-28

        md:py-0
        md:text-100;
      line-height: initial;
    }

    .single-moodboard-header-footer {
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

      .single-moodboard-header-actions {
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
