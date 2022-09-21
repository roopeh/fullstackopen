import { Pressable, StyleSheet } from "react-native"
import Text from "./Text"
import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    padding: theme.paddings.inputPadding,
    marginTop: theme.paddings.contentPadding,
    borderWidth: theme.borders.defaultWidth,
    borderRadius: theme.borders.defaultRounding,
    borderColor: theme.colors.textPrimary,
    backgroundColor: theme.colors.blue
  },
  text: {
    textAlign: "center",
    color: theme.colors.textSecondary
  }
})

const DefaultButton = ({ text, onPress, buttonStyle, textStyle }) => {
  const buttonStyles = [
    styles.container,
    buttonStyle
  ]

  const textStyles = [
    styles.text,
    textStyle
  ]

  return (
    <Pressable style={buttonStyles} onPress={onPress}>
      <Text style={textStyles} bolded>{text}</Text>
    </Pressable>
  )
}

export default DefaultButton
