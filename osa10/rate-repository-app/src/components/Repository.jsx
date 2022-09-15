import { FlatList } from "react-native"
import { useParams } from "react-router-native"
import useRepository from "../hooks/useRepository"
import { ListSeparator } from "../theme"
import RepositoryItem from "./RepositoryItem"
import ReviewItem from "./ReviewItem"

const Repository = () => {
  const { id } = useParams()
  const data = useRepository(id)

  if (!data || !data.repository || data.loading) {
    return null
  }

  const repo = data.repository
  const reviews = repo.reviews.edges
    ? repo.reviews.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ListSeparator}
      renderItem={(item) => <ReviewItem review={item} leading={item.index === 0} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryItem content={repo} showButton />}
    />
  )
}

export default Repository
