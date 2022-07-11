import { gql } from "nuxt-graphql-request";

const query = gql`
  query contacts {
    contact: entry(section: "contact") {
      ... on contact_contact_Entry {
        email
        instagramUsername: text
      }
    }

    socials: globalSet(handle: "socials") {
      ... on socials_GlobalSet {
        instagramUrl: buttonLink {
          url
        }
        copyright:text
      }
    }
  }
`;

export default query;
