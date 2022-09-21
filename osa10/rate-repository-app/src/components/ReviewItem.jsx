import { StyleSheet, View, Alert } from "react-native"
import parseIso from "date-fns/parseISO"
import format from "date-fns/format"
import theme from "../theme"
import Text from "./Text"
import DefaultButton from "./DefaultButton"
import { useNavigate } from "react-router-native"
import useDeleteReview from "../hooks/useDeleteReview"

const styles = StyleSheet.create({
  container: {
    padding: theme.paddings.contentPadding,
    backgroundColor: theme.colors.white
  },
  reviewMainContainer: {
    flexDirection: "row",
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
  reviewInfoContainer: {
    marginLeft: theme.paddings.contentPadding,
    flex: 1
  },
  reviewText: {
    marginTop: theme.paddings.defaultPadding
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  leftButtonView: {
    flex: 1,
    marginRight: theme.dividerWidth
  },
  rightButtonView: {
    flex: 1,
    marginLeft: theme.dividerWidth,
    backgroundColor: theme.colors.error
  }
})

const ReviewItem = ({ review, leading, refetchFunc, viewingMyReviews }) => {
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()
  const containerStyle = [
    styles.container,
    leading && { marginTop: theme.dividerHeight }
  ]

  const viewRepository = () => {
    navigate(`/repository/${review.item.repository.id}`)
  }

  const tryDelete = async () => {
    try {
      await deleteReview(review.item.id)
      refetchFunc()
    } catch (error) {
      console.log(error)
    }
  }

  const confirmDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: tryDelete,
          style: "destructive"
        }
      ],
      {
        cancelable: true,
        onDismiss: () => null
      }
    )
  }

  const parsedIso = parseIso(review.item.createdAt)
  const formattedDate = format(parsedIso, "dd.MM.yyyy")

  // Show either reviewer's username or reviewed repository's name
  const name = viewingMyReviews ? review.item.repository.fullName : review.item.user.username

  return (
    <View style={containerStyle}>
      <View style={styles.reviewMainContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText} bolded>{review.item.rating}</Text>
        </View>
        <View style={styles.reviewInfoContainer}>
          <Text color="textBlack" bolded>{name}</Text>
          <Text style={styles.reviewText}>{formattedDate}</Text>
          <Text style={styles.reviewText} color="textBlack">{review.item.text}</Text>
        </View>
      </View>
      {viewingMyReviews && (
        <View style={styles.buttonContainer}>
          <DefaultButton text="View repository"
            onPress={viewRepository}
            buttonStyle={styles.leftButtonView} />
          <DefaultButton text="Delete review"
            onPress={confirmDelete}
            buttonStyle={styles.rightButtonView} />
        </View>
      )}
    </View>
  )
}

export default ReviewItem
