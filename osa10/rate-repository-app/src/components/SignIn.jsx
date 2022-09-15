import * as yup from "yup"
import useSignIn from "../hooks/useSignIn"
import { useNavigate } from "react-router-native"
import DefaultForm from "./DefaultForm"

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const inputs = [
    {
      name: "username",
      placeholder: "Username",
      initial: ""
    },
    {
      name: "password",
      placeholder: "Password",
      initial: "",
      secureTextEntry: true
    }
  ]

  const onSubmit = async (values, { resetForm }) => {
    try {
      await signIn({ username: values.username, password: values.password })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    resetForm()
  }

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(3, "Username must be at least 3 characters long")
      .required("Username is required"),
    password: yup
      .string()
      .min(3, "Password must be at least 3 characters long")
      .required("Password is required")
  })

  return (
    <DefaultForm
      inputs={inputs}
      validationSchema={validationSchema}
      submitText="Sign in"
      onSubmit={onSubmit} />
  )
}

export default SignIn
