<template>
  <div class="modal">
    <div class="label">
      <span>{{ $t("board.genericError") }}</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="w-2/5 button white"
          @click.native="$store.commit('moodboards/SET_ACTIVE_OVERLAY', false)"
        >
          <span>{{ $t("board.continue") }}</span>
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