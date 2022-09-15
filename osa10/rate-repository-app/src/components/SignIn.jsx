import { StyleSheet, View } from "react-native"
import { Formik } from "formik"
import * as yup from "yup"
import FormikTextInput from "./FormikTextInput"
import theme from "../theme"
import useSignIn from "../hooks/useSignIn"
import { useNavigate } from "react-router-native"
import DefaultButton from "./DefaultButton"

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
  username: "",
  password: ""
}

const SignIn = () => {
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async (values, { resetForm }) => {
    try {
      await signIn({ username: values.username, password: values.password })
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    resetForm(initialValues)
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
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          <FormikTextInput name="username" placeholder="Username" style={styles.input} />
          <FormikTextInput name="password" placeholder="Password" style={styles.input} secureTextEntry />
          <DefaultButton text="Sign in" onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  )
}

export default SignIn
