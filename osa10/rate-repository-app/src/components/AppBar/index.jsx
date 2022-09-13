import { View, StyleSheet, ScrollView } from "react-native"
import Constants from "expo-constants"
import theme from "../../theme"
import AppBarTab from "./AppBarTab"
import useMe from "../../hooks/useMe"
import useAuthStorage from "../../hooks/useAuthStorage"
import { useApolloClient } from "@apollo/client"

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
  const meHook = useMe()
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" link="" />
        {meHook.me && meHook.me.id
          ? <AppBarTab text="Sign out" onPressed={signOut} />
          : <AppBarTab text="Sign in" link="SignIn" />
        }
      </ScrollView>
    </View>
  )
}

export default AppBar
