import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries"

const useRepositories = (order, direction) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy: order,
      orderDirection: direction
    },
    fetchPolicy: "cache-and-network",
  })

  const repositories = data && data.repositories ? data.repositories : []

  return { repositories, error, loading }
}

export default useRepositories
