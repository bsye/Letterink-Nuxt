import { gql } from "nuxt-graphql-request";

const query = gql`
  query homepage {
    homepage:entry(section: "Homepage") {
      ... on homepage_homepage_Entry {
        works {
          id
          title
          slug
          ... on works_default_Entry {
            date: text
            previewImages: imagesLimited {
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
