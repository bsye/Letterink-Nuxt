<template>
  <div class="contact" v-if="contact">
    <p class="contact-label">Contact us</p>

    <a
      href="mailto:info@letterink.it"
      class="contact-email"
      v-if="contact.email"
    >
      {{ contact.email }}
    </a>

    <p>Follow us on</p>

    <a :href="instagramUrl" class="contact-instagram">
      Instagram
      <span>{{ contact.instagramUsername }}</span>
    </a>
  </div>
</template>

<script>
import query from "~/graphql/queries/contact";

export default {
  data() {
    return {
      contact: null,
      socials: null,
    };
  },

  async asyncData({ $graphql }) {
    try {
      const { contact, socials } = await $graphql.default.request(query);

      return { contact, socials };
    } catch (err) {
      console.log("ERROR: ", err);
    }
  },

  computed: {
    instagramUrl() {
      if (this.socials && this.socials.instagramUrl)
        return this.socials.instagramUrl.url;
      return null;
    },
  },
};
</script>

<style lang="scss" scoped>
.contact {
  @apply flex
    flex-col
    justify-center
    items-center
    uppercase
    text-42
    font-cabinet-grotesk
    
    md:text-100
    md:gap-y-4;

  @screen md {
    line-height: 6.25rem;
  }

  .contact-email {
    @apply font-bold;
  }

  .contact-label,
  .contact-instagram {
    @apply font-gambetta
        flex
        gap-x-2
        relative;

    span {
      @apply hidden
        text-sm
        absolute
        top-4
        -right-2
        transform
        translate-x-full        

        md:flex;
    }
  }

  height: calc(100vh - 6.75rem);
}
</style>