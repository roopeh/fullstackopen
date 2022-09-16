import { useState } from "react"
import { FlatList, Pressable } from "react-native"
import { useNavigate } from "react-router-native"
import { useDebounce } from "use-debounce"
import useRepositories from "../../hooks/useRepositories"
import RepositoryItem from "../RepositoryItem"
import { ListSeparator } from "../../theme"
import RepositoryListHeader from "./RepositoryListHeader"

const orderContent = [
  {
    value: "CREATED_AT.DESC",
    label: "Latest repositories",
  },
  {
    value: "RATING_AVERAGE.DESC",
    label: "Highest rated repositories",
  },
  {
    value: "RATING_AVERAGE.ASC",
    label: "Lowest rated repositories",
  }
]

const RepositoryList = () => {
  const [searchText, setSearchText] = useState("")
  const [delayedSearchText] = useDebounce(searchText, 500)
  const [selectedOrder, setSelectedOrder] = useState(orderContent[0].value)
  const splittedOrderString = selectedOrder.split(".")

  const { repositories } = useRepositories(
    splittedOrderString[0],
    splittedOrderString[1],
    delayedSearchText
  )
  const navigate = useNavigate()

  // Get the nodes from the edges array
  const repositoryNodes = repositories && repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : []

  const renderItem = ({ item }) => (
    <Pressable onPress={() => navigate(`/repository/${item.id}`)}>
      <RepositoryItem content={item} />
    </Pressable>
  )

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ListSeparator}
      renderItem={renderItem}
      keyExtractor={(_item, index) => index.toString()}
      ListHeaderComponent={
        // NO arrow function here or input will keep re rendering
        // and define component outside of class
        <RepositoryListHeader
          searchText={searchText}
          setSearchText={setSearchText}
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
          orderContent={orderContent}
        />
      }
    />
  )
}

export default RepositoryList
