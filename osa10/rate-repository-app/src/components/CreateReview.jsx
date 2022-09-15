import { useNavigate } from "react-router-native"
import * as yup from "yup"
import useCreateReview from "../hooks/useCreateReview"
import DefaultForm from "./DefaultForm"

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

  const inputs = [
    {
      name: "repositoryOwner",
      placeholder: "Repository owner name",
      initial: ""
    },
    {
      name: "repositoryName",
      placeholder: "Repository name",
      initial: ""
    },
    {
      name: "repositoryRating",
      placeholder: "Rating between 0 and 100",
      initial: ""
    },
    {
      name: "repositoryReview",
      placeholder: "Review",
      initial: "",
      multiline: true
    }
  ]

  return (
    <DefaultForm
      inputs={inputs}
      validationSchema={validationSchema}
      submitText="Create a review"
      onSubmit={onSubmit} />
  )
}

export default CreateReview
