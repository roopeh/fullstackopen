import { gql } from "@apollo/client"

export const SIGN_IN = gql`
mutation Authenticate($credentials: AuthenticateInput) {
  authenticate(credentials: $credentials) {
    accessToken
  }
}
`

export const CREATE_REVIEW = gql`
mutation Mutation($review: CreateReviewInput) {
  createReview(review: $review) {
    id
    rating
    repository {
      id
    }
  }
}
`

export const SIGN_UP = gql`
mutation Mutation($user: CreateUserInput) {
  createUser(user: $user) {
    id
    username
  }
}
`

export const DELETE_REVIEW = gql`
mutation Mutation($deleteReviewId: ID!) {
  deleteReview(id: $deleteReviewId)
}
`
