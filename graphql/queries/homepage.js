import { gql } from "nuxt-graphql-request";

const query = gql`
  query works {
    entry(section: "Homepage") {
      ... on homepage_homepage_Entry {
        works {
          ... on works_default_Entry {
            id
            title
            slug
            description
          }
        }
      }
    }
  }
`;

export default query;
