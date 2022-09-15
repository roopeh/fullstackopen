import { useState } from "react"
import { FlatList, Pressable, StyleSheet } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { useNavigate } from "react-router-native"
import useRepositories from "../hooks/useRepositories"
import RepositoryItem from "./RepositoryItem"
import theme, { ListSeparator } from "../theme"

const styles = StyleSheet.create({
  orderMenu: {
    margin: theme.paddings.contentPadding,
    padding: theme.paddings.defaultPadding,
    backgroundColor: theme.colors.primary,
    borderWidth: 0
  },
  menuHeader: {
    color: theme.colors.primary
  }
})

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
  const [selectedOrder, setSelectedOrder] = useState(orderContent[0].value)
  const splittedOrderString = selectedOrder.split(".")

  const { repositories } = useRepositories(
    splittedOrderString[0],
    splittedOrderString[1]
  )
  const navigate = useNavigate()

  // Get the nodes from the edges array
  const repositoryNodes = repositories && repositories.edges
    ? repositories.edges.map(edge => edge.node)
    : []

  const OrderMenu = () => (
    <Picker
      selectedValue={selectedOrder}
      style={styles.orderMenu}
      onValueChange={(value) => setSelectedOrder(value)} >
        <Picker.Item label="Select an item..." value="default" enabled={false} style={styles.menuHeader} />
        {orderContent.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
    </Picker>
  )

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
      ListHeaderComponent={() => <OrderMenu />}
    />
  )
}

export default RepositoryList
