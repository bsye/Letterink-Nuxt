import { gql } from "nuxt-graphql-request";

const query = gql`
  query inspirations($category: [String], $color: [String]) {
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

    inspirationsByCategories: entries(
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

    moodboards: entries(section: "editorialMoodboard") {
      title
      slug
      id
      ... on editorialMoodboard_default_Entry {
        inspirationItems {
          ... on inspirationItems_default_Entry {
            id
            title
            image {
              url
            }
          }
        }
      }
      ... on editorialMoodboard_default_Entry {
        id
      }
    }
  }
`;

export default query;
