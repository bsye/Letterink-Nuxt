import { gql } from 'nuxt-graphql-request';

const query = gql`
  query singleInspiration($slug: [String]){
    entry(section: "inspiration", slug: $slug) {
      id
      title
      uid
      sectionHandle
      ... on inspiration_default_Entry {
        id
        description
        image {
          url: url(transform: "large")
          width(transform: "large")
          height(transform: "large")
          srcset(sizes: ["600", "300"])
        }
      }
    }
  }
`

export default query