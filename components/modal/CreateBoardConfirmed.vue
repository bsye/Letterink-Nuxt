<template>
  <div class="create-moodboard">
    <div class="create-moodboard-label">
      <img
        class="check"
        src="~/assets/icons/check.svg"
      />
      <span>{{ $t('board.created') }}</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="w-2/5 button white"
          :inactive="true"
          @click.native="$root.$emit('hide-overlay', true)"
        >
          <span>{{ $t('board.continue') }}</span>
        </ElementButton>
        <ElementButton
          class="button white full"
          type="submit"
        >
          <NuxtLink :to="localePath('/inspirations/user')">
            <span>{{ $t('board.myMoodboards') }}</span>
          </NuxtLink>
        </ElementButton>
      </div>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.create-moodboard {
  @apply flex
    flex-col
    grow
    justify-between
    items-center;

  .create-moodboard-label {
    @apply text-28
        font-sans
        text-center
        flex-col
        grow
        flex
        justify-between
        items-center
        py-16
        px-20;
    line-height: initial;
  }

  form {
    @apply flex
        flex-col
        w-full
        px-5
        pb-5
        gap-y-5;

    input {
      @apply border
        border-white
        text-sm
        text-white
        bg-black
        outline-none
        p-4
        uppercase;
    }

    button,
    div {
      @apply
        w-full;
    }

    .form-actions {
      @apply flex
        justify-between
        gap-x-4;
    }
  }
}
</style>