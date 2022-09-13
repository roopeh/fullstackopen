import { Pressable, StyleSheet, View } from "react-native"
import { Formik } from "formik"
import Text from "./Text"
import FormikTextInput from "./FormikTextInput"
import theme from "../theme"
import useSignIn from "../hooks/useSignIn"

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
  },
  button: {
    width: "100%",
    padding: theme.paddings.inputPadding,
    marginTop: theme.paddings.contentPadding,
    borderWidth: theme.borders.defaultWidth,
    borderRadius: theme.borders.defaultRounding,
    borderColor: theme.colors.textPrimary,
    backgroundColor: theme.colors.blue
  },
  buttonText: {
    textAlign: "center",
    color: theme.colors.textSecondary
  }
})

const initialValues = {
  username: "",
  password: ""
}

const SignIn = () => {
  const [signIn] = useSignIn()

  const onSubmit = async (values, { resetForm }) => {
    try {
      const { data } = await signIn({ username: values.username, password: values.password })
      console.log(data)
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
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText} bolded>Sign in</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  )
}

export default SignIn
