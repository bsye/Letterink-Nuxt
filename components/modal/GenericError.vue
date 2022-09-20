<template>
  <div class="modal">
    <div class="label">
      <span>{{ $t('board.genericError') }}</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="w-2/5 button white"
          @click.native="$root.$emit('hide-overlay', true)"
        >
          <span>{{ $t('board.continue') }}</span>
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
}
</style>