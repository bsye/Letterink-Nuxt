<template>
  <div class="add">
    <form @submit.prevent="addInspiration">
      <div class="fields">
        <template v-if="moodboards">
          <div
            class="field"
            v-for="moodboard of alreadyInMoodboard"
            :key="moodboard.id"
          >
            <label>
              <input
                type="checkbox"
                checked
                :name="moodboard.id"
                ref="moodboard"
                v-model="unselectedMoodboard[moodboard.id]"
              />
              <span class="checkmark"></span>
              <span class="title">{{ moodboard.title }}</span>
            </label>
          </div>
          <div
            class="field"
            v-for="moodboard of moodboards"
            :key="moodboard.id"
          >
            <label>
              <input
                type="checkbox"
                :name="moodboard.id"
                ref="moodboard"
                v-model="selectedMoodboard[moodboard.id]"
              />
              <span class="checkmark"></span>
              <span class="title">{{ moodboard.title }}</span>
            </label>
          </div>
        </template>
        <template v-else>
          <div class="empty">
            {{ $t('board.noMoodboard') }}
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
            <span>{{ $t('board.createConfirm') }}</span>
          </div>
        </ElementButton>
        <ElementButton
          class="button white full"
          :focus="true"
          @click.native="$root.$emit('hide-overlay', true)"
          type="submit"
        >
          <span>{{ $t('board.save') }}</span>
        </ElementButton>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moodboards: false,
      alreadyInMoodboard: [],
      unselectedMoodboard: [],
      selectedMoodboard: [],
    };
  },

  async mounted() {
    const userMoodboards = await this.$store.getters[
      "moodboards/getUserMoodboards"
    ];
    const currentInspiration = await this.$store.getters[
      "moodboards/getCurrentInspiration"
    ];

    this.alreadyInMoodboard = [];

    if (!userMoodboards || !currentInspiration)
      return (this.moodboards = false);
    this.moodboards = Object.values(userMoodboards).filter((moodboard) => {
      if (
        moodboard.inspirationItems.find(
          (element) => element.id == currentInspiration.id
        )
      ) {
        this.alreadyInMoodboard.push(moodboard);
        return false;
      }
      return moodboard;
    });
  },

  methods: {
    addInspiration() {
      let toRemove = Object.keys(this.unselectedMoodboard).filter(
        (item) => this.unselectedMoodboard[item] == false
      );
      let toAdd = Object.keys(this.selectedMoodboard).filter(
        (item) => this.selectedMoodboard[item] == true
      );

      if (toAdd) this.$store.dispatch("moodboards/addToMoodboards", toAdd);

      if (toRemove)
        this.$store.dispatch("moodboards/removeInspiration", {
          moodboards: toRemove,
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.add {
  @apply
    flex
    flex-col
    grow;

  .warning {
    @apply
      text-[10px]
      leading-snug
      pt-4
      px-4
      text-center;
  }

  form {
    @apply
      flex
      flex-col
      text-sm
      grow
      justify-between;

    .fields {
      @apply 
        flex
        grow
        overflow-auto
        max-h-full
        md:max-h-[280px]
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
            px-8
            inline-block
            py-3.5;
        }

        label {
          @apply cursor-pointer
              pl-4
              md:pl-5
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
      @apply
          grid
          grid-flow-row
          w-full
          md:grid-flow-col
          gap-4
          p-4
          md:p-5;

      button {
        @apply
          w-full;
      }
    }
  }
}
</style>