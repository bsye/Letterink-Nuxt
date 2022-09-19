import { gql } from "nuxt-graphql-request";

const query = gql`
  query homepage {
    homepage: entry(section: "Homepage") {
      ... on homepage_homepage_Entry {
        works {
          id
          title
          slug
          ... on works_default_Entry {
            date: text
            previewImages: workPreviewImages {
              id
              url
            }
            previewLayout
            color: inspirationColor {
              ... on colors_Category {
                workColor {
                  ... on workColor_backgrounColor_BlockType {
                    backgroundColor
                    textColor
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default query;
