import { StyleSheet, Text as NativeText } from 'react-native'
import theme from '../theme'

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: 16
  },
  secondary: {
    color: theme.colors.textSecondary
  },
  black: {
    color: "black"
  },
  bolded: {
    fontWeight: "bold",
    fontSize: 17
  },
})

const Text = ({ bolded, color, style, ...props }) => {
  const textStyles = [
    styles.text,
    bolded && styles.bolded,
    color === "textSecondary" && styles.secondary,
    color === "textBlack" && styles.black,
    style
  ]

  return <NativeText style={textStyles} {...props} />
}

export default Text
