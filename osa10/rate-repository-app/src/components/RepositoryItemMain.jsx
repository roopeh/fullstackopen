import { Image, StyleSheet, View } from 'react-native'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  upperSection: {
    flexDirection: "row",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: theme.rounding.defaultRounding
  },
  mainInfo: {
    paddingLeft: theme.paddings.contentPadding,
  },
  description: {
    marginTop: theme.paddings.defaultPadding,
  },
  languageBox: {
    backgroundColor: theme.colors.repositoryLanguage,
    marginTop: theme.paddings.defaultPadding,
    padding: theme.paddings.defaultPadding,
    borderRadius: theme.rounding.defaultRounding,
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
