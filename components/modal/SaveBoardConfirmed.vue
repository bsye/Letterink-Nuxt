<template>
  <div class="modal">
    <div class="label">
      <img
        class="check"
        src="~/assets/icons/check.svg"
      />
      <span>{{ $t('board.saved') }}</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="w-2/5 button white"
          @click.native="$root.$emit('hide-overlay', true)"
        >
          <span>{{ $t('board.continue') }}</span>
        </ElementButton>
        <ElementButton
          :focus="true"
          class="button white full"
          type="submit"
        >
          <NuxtLink :to="localePath('/inspirations/user')">
            <span>{{ $t('board.viewMoodboards') }}</span>
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
.overlay {
  .modal {
    .label {
      @apply
        justify-center;
    }
  }

  .check {
    @apply
      mb-6;
  }
}
</style>