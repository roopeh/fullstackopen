import { StyleSheet, View } from "react-native"
import { Formik } from "formik"
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

  // Yup doesn't seem to work on my Android phone so going with Formik default validation
  return (
    <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validate={(values) => {
      const errors = {}
      if (!values.username) {
        errors.username = "Username is required"
      } else if (values.username.length < 3) {
        errors.username = "Username must be at least 3 characters long"
      }
      if (!values.password) {
        errors.password = "Password is required"
      } else if (values.password.length < 3) {
        errors.password = "Password must be at least 3 characters long"
      }
      return errors
    }}>
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
