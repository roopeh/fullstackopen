import { gql } from "@apollo/client"

export const GET_REPOSITORIES = gql`
query Query($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy,
$searchKeyword: String) {
  repositories(orderDirection: $orderDirection, orderBy: $orderBy,
  searchKeyword: $searchKeyword) {
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
query Query($repositoryId: ID!, $first: Int, $after: String) {
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
    reviews(first: $first, after: $after) {
      totalCount
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
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
query Query($first: Int, $after: String, $includeReviews: Boolean = false) {
  me {
    id
    username
    reviews (first: $first, after: $after) @include(if: $includeReviews) {
      totalCount
      pageInfo {
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        cursor
        node {
          id
          repository {
            id
            fullName
          }
          rating
          createdAt
          text
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
