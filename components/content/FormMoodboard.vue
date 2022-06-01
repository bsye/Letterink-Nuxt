<template>
  <div class="form-moodboard">
    <div class="form-moodboard-header">
      <div class="form-moodboard-header-text">Aggiungi a moodboard</div>
      <button>
        <img src="~/assets/icons/cross.svg" />
      </button>
    </div>

    <div class="form-moodboard-content">
      <form @submit.prevent>
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
                :value="moodboard.slug"
                v-model="selectedMoodboard"
              />
              <span class="checkmark"></span>
              {{ moodboard.title }}
            </label>
          </div>
        </div>

        <div class="form-footer">
          <button>Crea nuova board</button>
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
  },

  data() {
    return {
      selectedMoodboard: null,
    };
  },
};
</script>

<style lang="scss" scoped>
.form-moodboard {
  @apply bg-black
    text-white
    uppercase
    font-cabinet-grotesk
    text-sm
    w-full
    mx-auto;
  max-width: 31rem;

  .form-moodboard-header {
    @apply flex
        justify-center
        py-5
        relative
        border-b
        border-white;

    button {
      @apply absolute
        right-5;

      img {
        @apply transform
        rotate-45;
      }
    }
  }

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
            py-5
            text-sm;
        }

        button[type="submit"] {
          @apply bg-white
            text-black;
        }
      }
    }
  }
}
</style>