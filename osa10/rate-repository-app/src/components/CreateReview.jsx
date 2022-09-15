import { Formik } from "formik"
import { StyleSheet, View } from "react-native"
import { useNavigate } from "react-router-native"
import * as yup from "yup"
import useCreateReview from "../hooks/useCreateReview"
import theme from "../theme"
import DefaultButton from "./DefaultButton"
import FormikTextInput from "./FormikTextInput"

const styles = StyleSheet.create({
  form: {
    backgroundColor: theme.colors.white,
    padding: theme.paddings.contentPadding,
    paddingTop: 0
  },
  input: {
    width: "100%",
    padding: theme.paddings.inputPadding,
    marginTop: theme.paddings.contentPadding,
    borderWidth: theme.borders.defaultWidth,
    borderRadius: theme.borders.defaultRounding,
    borderColor: theme.colors.textPrimary
  }
})

const initialValues = {
  repositoryOwner: "",
  repositoryName: "",
  repositoryRating: "",
  repositoryReview: ""
}

const CreateReview = () => {
  const [createReview] = useCreateReview()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview({
        repositoryName: values.repositoryName,
        ownerName: values.repositoryOwner,
        rating: Number(values.repositoryRating),
        text: values.repositoryReview
      })
      navigate(`/repository/${data.createReview.repository.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  const validationSchema = yup.object().shape({
    repositoryOwner: yup
      .string()
      .required("Repository owner name is required"),
    repositoryName: yup
      .string()
      .required("Repository name is required"),
    repositoryRating: yup
      .number()
      .integer("Rating must be an integer")
      .min(0, "Minimum rating is 0")
      .max(100, "Maximum rating is 100")
      .required("Rating is required")
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput
            name="repositoryOwner"
            placeholder="Repository owner name"
            style={styles.input} />
          <FormikTextInput
            name="repositoryName"
            placeholder="Repository name"
            style={styles.input} />
          <FormikTextInput
            name="repositoryRating"
            placeholder="Rating between 0 and 100"
            style={styles.input} />
          <FormikTextInput
            name="repositoryReview"
            placeholder="Review"
            style={styles.input}
            multiline />
          <DefaultButton text="Create a review" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  )
}

export default CreateReview
