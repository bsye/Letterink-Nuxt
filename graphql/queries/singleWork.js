import { gql } from "nuxt-graphql-request";

const query = gql`
  query works($slug: [String]) {
    work: entry(section: "works", slug: $slug) {
      ... on works_default_Entry {
        title
        slug
        description
        text
        image {
          id
          url
        }
        workPreviewImages {
          id
          url
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
            slug
          }
        }
        workContent {
          ... on workContent_mediaContent_BlockType {
            id
            typeHandle
            workMedia {
              ... on workMedia_inspiration_BlockType {
                id
                typeHandle
                horizontalAlignment
                verticalAlignment
                width
                inspiration {
                  ... on inspirationItems_default_Entry {
                    id
                    image {
                      url
                    }
                  }
                }
              }
              ... on workMedia_image_BlockType {
                id
                typeHandle
                horizontalAlignment
                verticalAlignment
                width
                image {
                  url
                }
              }
            }
          }
          ... on workContent_spacer_BlockType {
            id
            typeHandle
            spacerValue
          }
          ... on workContent_textContent_BlockType {
            id
            typeHandle
            maxWidth
            textContent
          }
        }
      }
    }
  }
`;

export default query;
