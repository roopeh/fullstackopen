import { StyleSheet, View } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Searchbar } from "react-native-paper"
import theme from "../../theme"

const styles = StyleSheet.create({
  orderMenu: {
    margin: theme.paddings.contentPadding,
    padding: theme.paddings.defaultPadding,
    backgroundColor: theme.colors.primary,
    borderWidth: 0
  },
  menuHeader: {
    color: theme.colors.primary
  },
  searchBar: {
    margin: theme.paddings.contentPadding,
    backgroundColor: theme.colors.white
  }
})

const RepositoryListHeader = ({
  searchText, setSearchText, selectedOrder, setSelectedOrder, orderContent
}) => (
  <View>
    <Searchbar
      placeholder="Search by name..."
      onChangeText={(text) => setSearchText(text)}
      value={searchText}
      style={styles.searchBar}
    />
    <Picker
      selectedValue={selectedOrder}
      style={styles.orderMenu}
      onValueChange={(value) => setSelectedOrder(value)} >
        <Picker.Item label="Select an item..." value="default" enabled={false} style={styles.menuHeader} />
        {orderContent.map((item) => (
          <Picker.Item key={item.value} label={item.label} value={item.value} />
        ))}
    </Picker>
  </View>
)

export default RepositoryListHeader
