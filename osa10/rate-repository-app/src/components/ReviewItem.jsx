import { StyleSheet, View } from "react-native"
import parseIso from "date-fns/parseISO"
import format from "date-fns/format"
import theme from "../theme"
import Text from "./Text"

const styles = StyleSheet.create({
  container: {
    padding: theme.paddings.contentPadding,
    backgroundColor: theme.colors.white,
    flexDirection: "row"
  },
  ratingContainer: {
    width: theme.images.avatarWidth,
    height: theme.images.avatarHeight,
    borderWidth: 2,
    borderRadius: theme.images.avatarWidth / 2,
    borderColor: theme.colors.blue,
    justifyContent: "center",
    alignItems: "center"
  },
  ratingText: {
    textAlign: "center",
    textAlignVertical: "center",
    color: theme.colors.blue
  },
  reviewInfo: {
    marginLeft: theme.paddings.contentPadding,
    flex: 1
  },
  reviewText: {
    marginTop: theme.paddings.defaultPadding
  }
})

const ReviewItem = ({ review, leading }) => {
  const containerStyle = [
    styles.container,
    leading && { marginTop: theme.dividerHeight }
  ]

  const parsedIso = parseIso(review.item.createdAt)
  const formattedDate = format(parsedIso, "dd.MM.yyyy")

  return (
    <View style={containerStyle}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText} bolded>{review.item.rating}</Text>
      </View>
      <View style={styles.reviewInfo}>
        <Text color="textBlack" bolded>{review.item.user.username}</Text>
        <Text style={styles.reviewText}>{formattedDate}</Text>
        <Text style={styles.reviewText} color="textBlack">{review.item.text}</Text>
      </View>
    </View>
  )
}

export default ReviewItem
