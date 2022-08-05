import { gql } from "nuxt-graphql-request";

const query = gql`
  query moodboard($slug: [String]) {
    moodboard:entry(section: "editorialMoodboard", slug: $slug) {
      id
      title
      slug
      ... on editorialMoodboard_default_Entry {
        inspirationItems {
          ... on inspirationItems_default_Entry {
            id
            title
            image {
              url
            }
          }
        }
      }
    }
  }
`;

export default query;
