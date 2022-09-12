import { FlatList, View, StyleSheet } from "react-native"
import useRepositories from "../hooks/useRepositories"
import RepositoryItem from "./RepositoryItem"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { repositories } = useRepositories()

  // Get the nodes from the edges array
  const repositoryNodes = repositories && repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : []

  const renderItem = ({ item }) => <RepositoryItem content={item} />

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
    />
  )
}

export default RepositoryList
