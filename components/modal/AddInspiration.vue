<template>
  <div class="form-moodboard">
    <form @submit.prevent="addInspiration">
      <div class="fields">
        <template v-if="moodboards">
          <div
            class="field"
            v-for="moodboard of moodboards"
            :key="moodboard.id"
          >
            <label>
              <input
                type="radio"
                :name="moodboard.slug"
                :value="moodboard"
                v-model="selectedMoodboard"
              />
              <span class="checkmark"></span>
              <span class="title">{{ moodboard.title }}</span>
            </label>
          </div>
        </template>
        <template v-else>
          <div class="empty">
            {{ $t('board.notFound') }}
          </div>
        </template>
      </div>

      <div class="form-footer">
        <ElementButton
          class="button white"
          @click.native="$root.$emit('modal-create-board', true)"
        >
          <div>
            <div class="icon">
              <img src="~/assets/icons/cross-black.svg" />
            </div>
            <span>Crea nuova board</span>
          </div>
        </ElementButton>
        <ElementButton
          class="button white full"
          @click.native="$root.$emit('hide-overlay', true)"
          type="submit"
        >
          <span>Salva</span>
        </ElementButton>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moodboards: this.$store.getters["moodboards/getUserMoodboards"],
      selectedMoodboard: null,
    };
  },

  methods: {
    addInspiration() {
      if (this.selectedMoodboard) {
        this.$store.commit("moodboards/ADD_TO_MOODBOARD", {
          moodboard: this.selectedMoodboard,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-moodboard {
  @apply
    flex
    flex-col
    grow;

  form {
    @apply
      flex
      flex-col
      grow
      justify-between;

    .fields {
      @apply 
        flex
        grow
        overflow-auto
        max-h-[240px]
        flex-col;

      .empty {
        @apply
          grow
          flex
          h-full
          justify-center
          items-center;
      }

      .field {
        @apply border-b
          border-white
          flex
          items-center
          gap-x-3
          relative
          cursor-pointer;

        .title {
          @apply
            px-7
            inline-block
            py-3.5;
        }

        label {
          @apply cursor-pointer
              pl-5
              w-full;

          input {
            @apply h-0
              w-0
              opacity-0;

            &:checked {
              @apply bg-white;
            }

            &:checked ~ .checkmark {
              @apply bg-white;
            }
          }

          .checkmark {
            @apply bg-black
              border
              border-white
              rounded-full
              absolute
              h-6
              w-6
              top-1/2
              left-5
              transform
              -translate-y-1/2
              transition-colors;
          }
        }
      }
    }

    .form-footer {
      @apply flex
          justify-between
          gap-x-4
          p-5;

      button {
        @apply
          w-full;
      }
    }
  }
}
</style>