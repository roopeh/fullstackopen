import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
query Query {
  repositories {
    edges {
      node {
        fullName
        description
        ownerAvatarUrl
        language
        ratingAverage
        reviewCount
        stargazersCount
        forksCount
      }
    }
  }
}
`
