import { StyleSheet, Pressable } from "react-native"
import { Link } from "react-router-native"
import theme from "../../theme"
import Text from "../Text"

const styles = StyleSheet.create({
  tab: {
    marginLeft: theme.paddings.contentPadding
  }
})

const AppBarTab = ({ text, link }) => {
  return (
    <Pressable style={styles.tab}>
      <Link to={`/${link}`}>
        <Text color="textSecondary" bolded>{text}</Text>
      </Link>
    </Pressable>
  )
}

export default AppBarTab
