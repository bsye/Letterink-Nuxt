<template>
  <div class="form-moodboard">
    <div class="form-moodboard-content">
      <form @submit.prevent="addInspiration">
        <div class="fields">
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
              {{ moodboard.title }}
            </label>
          </div>
        </div>

        <div class="form-footer">
          <button @click.prevent="$emit('newMoodboard')">
            <span class="plus">
              <img src="~/assets/icons/cross-black.svg" />
            </span>

            Crea nuova board
          </button>
          <button type="submit">Salva</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    moodboards: Array,
    inspiration: Object,
  },

  data() {
    return {
      selectedMoodboard: null,
    };
  },

  methods: {
    addInspiration() {
      if (this.selectedMoodboard && this.inspiration) {
        this.$store.commit("moodboards/addInspirationToMoodboard", {
          inspiration: this.inspiration,
          moodboard: this.selectedMoodboard,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.form-moodboard {
  .form-moodboard-content {
    form {
      .fields {
        @apply flex
            flex-col;

        .field {
          @apply border-b
            border-white
            px-7
            py-4
            flex
            items-center
            gap-x-3
            relative
            cursor-pointer;

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
            p-5
            pt-20;

        button {
          @apply w-full
            uppercase
            font-cabinet-grotesk
            flex
            justify-center
            items-center
            py-5
            text-sm
            border
            border-transparent
            transition-colors;

          .plus {
            @apply bg-white
              rounded-full
              w-6
              h-6
              flex
              justify-center
              items-center
              mr-4;
          }

          &:hover {
            @apply md:border-white;
          }
        }

        button[type="submit"] {
          @apply bg-white
            text-black;

          &:hover {
            @apply md:bg-black
              md:border-white
              md:text-white;
          }
        }
      }
    }
  }
}
</style>