import { gql } from "nuxt-graphql-request";

const query = gql`
  query works {
    entry(section: "works", slug: "phil-nicole") {
      ... on works_default_Entry {
        title
        slug
        description
        image {
          id
          url
        }
        imagesLimited {
          id
        }
        table {
          ... on table_BlockType {
            id
            label
            collaboratorName
            urlCollaborator
          }
        }
        workCategories {
          ... on worksCategory_Category {
            id
            title
          }
        }
        projectBlocks {
          __typename
          ... on projectBlocks_text_BlockType {
            textContent
            maxWidth
          }
          ... on projectBlocks_spacer_BlockType {
            spacer
          }
          ... on projectBlocks_imageColumns_BlockType {
            images {
              ... on images_BlockType {
                id
                image {
                  id
                  url
                }
                width
                horizontalAlignment
                verticalAlignment
              }
            }
          }
        }
        text
      }
    }
  }
`;

export default query;
