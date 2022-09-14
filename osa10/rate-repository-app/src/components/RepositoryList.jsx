import { FlatList, View, StyleSheet, Pressable } from "react-native"
import { useNavigate } from "react-router-native"
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
  const navigate = useNavigate()

  // Get the nodes from the edges array
  const repositoryNodes = repositories && repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : []

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`repository/${item.id}`)}>
      <RepositoryItem content={item} />
    </Pressable>
  )

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
