import { StyleSheet, View } from "react-native"
import { Route, Routes, Navigate } from "react-router-native"
import RepositoryList from "./RepositoryList"
import AppBar from "./AppBar"
import theme from "../theme"
import SignIn from "./SignIn"
import Repository from "./Repository"
import CreateReview from "./CreateReview"
import SignUp from "./SignUp"
import MyReviews from "./MyReviews"

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
        <Route path="/SignUp" element={<SignUp />} exact />
        <Route path="/repository/:id" element={<Repository />} exact />
        <Route path="/createReview" element={<CreateReview />} exact />
        <Route path="/myReviews" element={<MyReviews />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
