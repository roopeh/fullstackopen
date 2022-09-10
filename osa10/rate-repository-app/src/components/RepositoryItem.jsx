import { StyleSheet, Text, View } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  item: {
    paddingLeft: theme.paddings.defaultPadding
  }
})

const RepositoryItem = ({ content }) => {
  return (
      <View style={styles.item}>
        <Text>Full name: {content.fullName}</Text>
        <Text>Description: {content.description}</Text>
        <Text>Language: {content.language}</Text>
        <Text>Stars: {content.stargazersCount}</Text>
        <Text>Forks: {content.forksCount}</Text>
        <Text>Reviews: {content.reviewCount}</Text>
        <Text>Rating: {content.ratingAverage}</Text>
      </View>
  )
}

export default RepositoryItem
