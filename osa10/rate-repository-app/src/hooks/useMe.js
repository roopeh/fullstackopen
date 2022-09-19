import { useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"

const useMe = (variables) => {
  const { data, loading, fetchMore, ...result } = useQuery(ME, {
    variables,
    fetchPolicy: "cache-and-network",
  })

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.me.reviews.pageInfo.hasNextPage
    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        ...variables,
        after: data.me.reviews.pageInfo.endCursor,
      }
    })
  }

  const me = data && data.me ? data.me : []
  return { me, fetchMore: handleFetchMore, loading, ...result }
}

export default useMe
