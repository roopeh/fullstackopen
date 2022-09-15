import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
query Query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy) {
    edges {
      node {
        id
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

export const GET_REPOSITORY = gql`
query Query($repositoryId: ID!) {
  repository(id: $repositoryId) {
    id
    fullName
    description
    ownerAvatarUrl
    language
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    url
    reviews {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`

export const ME = gql`
query Query {
  me {
    id
    username
  }
}
`
