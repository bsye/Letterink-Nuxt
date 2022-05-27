import { gql } from "nuxt-graphql-request";

const query = gql`
  query works {
    entries(section: "works") {
      ... on works_default_Entry {
        title
        slug
        image {
          id
          url
        }
        workCategories {
          ... on worksCategory_Category {
            id
            title
          }
        }
      }
    }
  }
`;

export default query;


