import { Image, StyleSheet, View } from "react-native"
import theme from "../../theme"
import Text from "../Text"

const styles = StyleSheet.create({
  upperSection: {
    flexDirection: "row",
    marginRight: theme.paddings.contentPadding
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.borders.defaultRounding
  },
  mainInfo: {
    paddingLeft: theme.paddings.contentPadding,
    paddingRight: theme.paddings.contentPadding
  },
  description: {
    marginTop: theme.paddings.defaultPadding,
  },
  languageBox: {
    backgroundColor: theme.colors.blue,
    marginTop: theme.paddings.defaultPadding,
    padding: theme.paddings.defaultPadding,
    borderRadius: theme.borders.defaultRounding,
    alignSelf: "flex-start"
  }
})

const RepositoryItemMain = ({ name, description, language, imageUrl }) => (
  <View style={styles.upperSection}>
    <Image style={styles.avatar} source={{ uri: imageUrl }} />
    <View style={styles.mainInfo}>
      <Text color="textBlack" bolded>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.languageBox}>
        <Text color="textSecondary">{language}</Text>
      </View>
    </View>
  </View>
)

export default RepositoryItemMain
