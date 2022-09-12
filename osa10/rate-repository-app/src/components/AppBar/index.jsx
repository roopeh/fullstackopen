import { View, StyleSheet, ScrollView } from "react-native"
import Constants from "expo-constants"
import theme from "../../theme"
import AppBarTab from "./AppBarTab"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight < theme.paddings.contentPadding
      ? theme.paddings.contentPadding
      : Constants.statusBarHeight,
    padding: theme.paddings.contentPadding,
    paddingLeft: 0,
    backgroundColor: theme.colors.secondary,
    flexDirection: "row",
  }
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" link="" />
        <AppBarTab text="Sign in" link="SignIn" />
      </ScrollView>
    </View>
  )
}

export default AppBar
