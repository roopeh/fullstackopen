import { FlatList } from "react-native"
import useMe from "../hooks/useMe"
import { ListSeparator } from "../theme"
import ReviewItem from "./ReviewItem"

const MyReviews = () => {
  const data = useMe({
    includeReviews: true,
    first: 6
  })

  if (!data.me || !data.me.id || !data.me.reviews) {
    return null
  }

  const reviews = data.me.reviews.edges.map(edge => edge.node)

  // Replace username field with repository name
  const alteredList = reviews.map((item) => {
    return {
      ...item,
      user: {
        ...item.user,
        username: item.repository.fullName
      }
    }
  })

  return (
    <FlatList
      data={alteredList}
      ItemSeparatorComponent={ListSeparator}
      renderItem={(item) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      onEndReached={() => data.fetchMore()}
      onEndReachedThreshold={0.1}
    />
  )
}

export default MyReviews
