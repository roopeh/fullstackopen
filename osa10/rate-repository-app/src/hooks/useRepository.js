import { useQuery } from "@apollo/client"
import { GET_REPOSITORY } from "../graphql/queries"

const useRepository = (id) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: {
      repositoryId: id
    },
    fetchPolicy: "cache-and-network",
  })

  const repository = data && data.repository ? data.repository : []
  return { repository, error, loading }
}

export default useRepository
