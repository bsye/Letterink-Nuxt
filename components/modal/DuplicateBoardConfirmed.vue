<template>
  <div class="modal">
    <div class="label">
      <img class="check" src="~/assets/icons/check.svg" />
      <span>{{ $t("board.duplicated") }}</span>
    </div>

    <form @submit.prevent="">
      <div class="form-actions">
        <ElementButton class="button white" type="submit">
          <NuxtLink :to="localePath('/inspirations/user')">
            <span>{{ $t("board.goToMoodboards") }}</span>
          </NuxtLink>
        </ElementButton>
        <ElementButton
          class="button white full"
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