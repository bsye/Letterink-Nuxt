import { gql } from "nuxt-graphql-request";

const query = gql`
  query inspirations {
    inspirations: entries(section: "inspirationItems") {
      ... on inspirationItems_default_Entry {
        id
        title
        slug
        image {
          url
        }
        buttonLink {
          url
          target
        }
        inspirationTags {
          title
          slug
        }
        inspirationColor {
          id
          title
          ... on colors_Category {
            title
            slug
            color
          }
        }
      }
    }

    inspirationsCategories: categories(group: "inspirationTags") {
      ... on inspirationTags_Category {
        title
        slug
        id
      }
    }

    inspirationsColors: categories(group: "colors") {
      ... on colors_Category {
        title
        slug
        id
      }
    }
  }
`;

export default query;
