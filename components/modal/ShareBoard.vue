<template>
  <div class="modal">
    <div class="label">
      {{ $t("board.share") }}
      <span>
        {{ `'${getCurrentMoodboard.title}'` }}
      </span>
    </div>

    <div class="buttons">
      <ElementButton @click.native="linkShare" class="button white">
        {{ $t("board.shareLink") }}
      </ElementButton>
      <ElementButton
        @click.native="$store.commit('moodboards/SET_ACTIVE_OVERLAY', false)"
        class="button white"
      >
        <ShareNetwork
          v-if="shareUrl"
          network="facebook"
          :url="shareUrl"
          :title="getCurrentMoodboard.title"
        >
          Facebook
        </ShareNetwork>
      </ElementButton>
      <ElementButton
        @click.native="$store.commit('moodboards/SET_ACTIVE_OVERLAY', false)"
        class="button white"
      >
        <ShareNetwork
          v-if="shareUrl"
          network="linkedin"
          :url="shareUrl"
          :title="getCurrentMoodboard.title"
        >
          Linkedin
        </ShareNetwork>
      </ElementButton>
      <ElementButton
        @click.native="$store.commit('moodboards/SET_ACTIVE_OVERLAY', false)"
        class="button white"
      >
        <ShareNetwork
          v-if="shareUrl"
          network="pinterest"
          :url="shareUrl"
          :title="getCurrentMoodboard.title"
        >
          Pinterest
        </ShareNetwork>
      </ElementButton>
      <ElementButton
        @click.native="$store.commit('moodboards/SET_ACTIVE_OVERLAY', false)"
        class="button white"
      >
        <ShareNetwork
          v-if="shareUrl"
          network="whatsapp"
          :url="shareUrl"
          :title="getCurrentMoodboard.title"
        >
          Whatsapp
        </ShareNetwork>
      </ElementButton>
      <div class="warning">
        <span>
          {{
            $t("board.shareWarning", { moodboard: getCurrentMoodboard.title })
          }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      moodboardName: "",
      shareUrl: null,
    };
  },

  async created() {
    this.shareUrl = await this.$store.dispatch("moodboards/generateShare");
  },

  computed: {
    ...mapGetters("moodboards", ["getCurrentMoodboard"]),
  },

  methods: {
    async linkShare() {
      if (!process.client) return;
      const generated = this.shareUrl;

      try {
        await this.$copyText(generated);
        this.$store.commit("moodboards/SET_ACTIVE_OVERLAY", false);
        alert("Copied");
      } catch (e) {
        this.$store.commit(
          "moodboards/SET_ACTIVE_OVERLAY",
          "shareBoardConfirmed"
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  .warning {
    @apply text-[10px]
      leading-snug
      py-8
      text-center;
  }

  .buttons {
    @apply flex
        flex-col
        w-full
        px-5
        pb-5
        gap-y-5;
  }
}
</style>