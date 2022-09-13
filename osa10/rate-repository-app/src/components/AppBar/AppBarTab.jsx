import { StyleSheet, Pressable } from "react-native"
import { Link } from "react-router-native"
import theme from "../../theme"
import Text from "../Text"

const styles = StyleSheet.create({
  tab: {
    marginLeft: theme.paddings.contentPadding
  }
})

const AppBarTabText = ({ text }) => <Text color="textSecondary" bolded>{text}</Text>

const AppBarTab = ({ text, link, onPressed }) => {
  if (onPressed) {
    return (
      <Pressable style={styles.tab} onPress={onPressed}>
        <AppBarTabText text={text} />
      </Pressable>
    )
  }
  return (
    <Pressable style={styles.tab}>
      <Link to={`/${link}`}>
        <AppBarTabText text={text} />
      </Link>
    </Pressable>
  )
}

export default AppBarTab
