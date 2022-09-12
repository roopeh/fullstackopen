import { StyleSheet, View } from "react-native"
import theme from "../../theme"
import RepositoryItemInfo from "./RepositoryItemInfo"
import RepositoryItemMain from "./RepositoryItemMain"

const styles = StyleSheet.create({
  item: {
    padding: theme.paddings.contentPadding,
    backgroundColor: theme.colors.white
  },
})

const RepositoryItem = ({ content }) => (
  <View style={styles.item}>
    <RepositoryItemMain
      name={content.fullName}
      description={content.description}
      language={content.language}
      imageUrl={content.ownerAvatarUrl} />
  
    <RepositoryItemInfo
      stars={content.stargazersCount}
      forks={content.forksCount}
      reviews={content.reviewCount}
      rating={content.ratingAverage} />
  </View>
)

export default RepositoryItem
