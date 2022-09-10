import { Text, StyleSheet, Pressable } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textSecondary,
    fontWeight: "bold"
  }
})

const AppBarText = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </Pressable>
  )
}

export default AppBarText
