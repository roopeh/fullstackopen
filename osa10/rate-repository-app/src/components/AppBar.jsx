import { View, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarText from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight < theme.paddings.menuBarPadding
      ? theme.paddings.menuBarPadding
      : Constants.statusBarHeight,
    padding: theme.paddings.menuBarPadding,
    backgroundColor: theme.colors.secondary,
  }
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarText text="Repositories" onPress={() => console.log("Pressed repo!")} />
    </View>
  )
}

export default AppBar
