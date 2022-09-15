import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    return await mutate({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating,
          text
        }
      }
    })
  }

  return [createReview, result]
}

export default useCreateReview
