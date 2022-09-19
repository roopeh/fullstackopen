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

  const loggedIn = meHook.me && meHook.me.id

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text="Repositories" link="" />
        {loggedIn && <AppBarTab text="Create a review" link="createReview" />}
        {loggedIn && <AppBarTab text="My reviews" link="myReviews" />}
        {loggedIn
          ? <AppBarTab text="Sign out" onPressed={signOut} />
          : <AppBarTab text="Sign in" link="SignIn" />
        }
        {!loggedIn && <AppBarTab text="Sign up" link="SignUp" />}
      </ScrollView>
    </View>
  )
}

export default AppBar
