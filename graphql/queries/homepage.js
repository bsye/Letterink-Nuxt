import { gql } from "nuxt-graphql-request";

const query = gql`
  query works {
    entry(section: "Homepage") {
      ... on homepage_homepage_Entry {
        works {
          title
          slug
          ... on works_default_Entry {
            text
            imagesLimited {
              id
              url
            }
          }
        }
      }
    }
  }
`;

export default query;
