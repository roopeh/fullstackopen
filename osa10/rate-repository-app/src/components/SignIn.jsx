import { Pressable, StyleSheet, View } from "react-native"
import { Formik } from "formik"
import Text from "./Text"
import FormikTextInput from "./FormikTextInput"
import theme from "../theme"

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
  const onSubmit = (values, { resetForm }) => {
    console.log(values)
    resetForm(initialValues)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
