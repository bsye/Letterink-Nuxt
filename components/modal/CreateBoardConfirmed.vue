<template>
  <div class="modal">
    <div class="label">
      <img class="check" src="~/assets/icons/check.svg" />
      <span>{{ $t("board.created") }}</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton
          class="w-2/5 button white full"
          type="submit"
          :focus="true"
          @click.native="$store.commit('moodboards/SET_ACTIVE_OVERLAY', false)"
        >
          <span>{{ $t("board.continue") }}</span>
        </ElementButton>
      </div>
    </form>
  </div>
</template>

<script>
</script>

<style lang="scss" scoped>
  .check {
    @apply
      mb-6;
  }
</style>