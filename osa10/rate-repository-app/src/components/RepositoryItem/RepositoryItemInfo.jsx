import { StyleSheet, View } from "react-native"
import theme from "../../theme"
import Text from "../Text"

const styles = StyleSheet.create({
  infoContainer: {
    marginTop: theme.paddings.contentPadding,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  infoItem: {
    alignItems: "center"
  }
})

const InfoItem = ({ text, amount }) => {
  const newAmount = amount >= 1000
    ? `${Math.sign(amount)*((amount / 1000).toFixed(1))}k`
    : amount
  return (
    <View style={styles.infoItem}>
      <Text bolded>{newAmount}</Text>
      <Text>{text}</Text>
    </View>
  )
}

const RepositoryItemInfo = ({ stars, forks, reviews, rating }) => (
  <View style={styles.infoContainer}>
    <InfoItem text="Stars" amount={stars} />
    <InfoItem text="Forks" amount={forks} />
    <InfoItem text="Reviews" amount={reviews} />
    <InfoItem text="Rating" amount={rating} />
  </View>
)

export default RepositoryItemInfo
