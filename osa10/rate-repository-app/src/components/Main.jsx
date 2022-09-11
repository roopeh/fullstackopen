import { StyleSheet, View } from "react-native"
import { Route, Routes, Navigate } from "react-router-native"
import RepositoryList from "./RepositoryList"
import AppBar from "./AppBar"
import theme from "../theme"
import SignIn from "./SignIn"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  }
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="/SignIn" element={<SignIn />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
