import { useNavigate } from "react-router-native"
import * as yup from "yup"
import useSignIn from "../hooks/useSignIn"
import useSignUp from "../hooks/useSignUp"
import DefaultForm from "./DefaultForm"

const SignUp = () => {
  const [signUp] = useSignUp()
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      const credentials = {
        username: values.username,
        password: values.password
      }
      await signUp(credentials)
      await signIn(credentials)
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

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
    },
    {
      name: "passwordConfirm",
      placeholder: "Password confirmation",
      initial: "",
      secureTextEntry: true
    }
  ]

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .min(1, "Username must be at least 1 character long")
      .max(30, "Username must be less than 30 characters")
      .required("Username is required"),
    password: yup
      .string()
      .min(5, "Password must be at least 5 characters long")
      .max(50, "Password must be less than 50 characters")
      .required("Password is required"),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required("Password confirmation is required")
  })

  return (
    <DefaultForm
      inputs={inputs}
      validationSchema={validationSchema}
      submitText="Sign up"
      onSubmit={onSubmit} />
  )
}

export default SignUp
