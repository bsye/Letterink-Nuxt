import { gql } from 'nuxt-graphql-request';

const query = gql`query allInspirations {
  entries(section: "inspiration") {
    id
    title
    uid
    slug
    sectionHandle
    ... on inspiration_default_Entry {
      id
      description
      image {
        id
        url(transform: "small")
        width(transform: "small")
        height(transform: "small")
      }
    }
  }
}`

export default query