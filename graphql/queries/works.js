import { gql } from "nuxt-graphql-request";

const query = gql`
  query works($category: [String]) {
    works: entries(section: "works") {
      ... on works_default_Entry {
        title
        slug
        image {
          id
          url
        }
        workCategories {
          ... on worksCategory_Category {
            id
            title
          }
        }
      }
    }

    worksByCategory: entries(
      section: "works"
      relatedToCategories: { slug: $category }
    ) {
      ... on works_default_Entry {
        title
        slug
        image {
          id
          url
        }
        workCategories {
          ... on worksCategory_Category {
            id
            title
          }
        }
      }
    }

    categories(group: "worksCategory") {
      title
      slug
      id
    }
  }
`;

export default query;
