import { gql } from "nuxt-graphql-request";

const query = gql`
  query inspirations($category: [String], $color: [String]) {
    inspirations: entries(
      section: "inspirationItems"
      relatedToCategories: [{ slug: $category }, { slug: $color }]
    ) {
      ... on inspirationItems_default_Entry {
        id
        title
        slug
        image {
          url
        }
        buttonLink {
          url
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
        groupId
        groupHandle
      }
    }
  }
`;

export default query;
