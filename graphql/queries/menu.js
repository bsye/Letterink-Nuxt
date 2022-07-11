import { gql } from "nuxt-graphql-request";

const query = gql`
  query menu {
    menu: globalSet(handle: "menu") {
      ... on menu_GlobalSet {
        menuItems {
          __typename
          ... on menuItems_entries_BlockType {
            id
            label
            relation
          }
          ... on menuItems_custom_BlockType {
            id
            label
            relation
          }
        }
      }
    }
  }
`;

export default query;
