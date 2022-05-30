import { gql } from "nuxt-graphql-request";

const query = gql`
  query contacts {
    contact:entry(section: "contact") {
      ... on contact_contact_Entry {
        email
        instagramUsername: text
      }
    }
  }
`;

export default query;
