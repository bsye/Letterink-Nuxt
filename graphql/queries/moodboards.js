import { gql } from "nuxt-graphql-request";

const query = gql`
  query moodboards {
    moodboards: entries(section: "editorialMoodboard") {
      ... on editorialMoodboard_default_Entry {
        id
        title
        slug
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
