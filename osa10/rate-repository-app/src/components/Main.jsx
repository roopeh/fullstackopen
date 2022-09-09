import { StyleSheet, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import RepositoryList from './RepositoryList'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  }
})

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList />
      <StatusBar style="auto" />
    </View>
  )
}

export default Main
