import { Formik } from "formik"
import { StyleSheet, View } from "react-native"
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

const DefaultForm = ({ inputs, validationSchema, submitText, onSubmit }) => {
  const initialValues = {}
  inputs.forEach((input) => {
    initialValues[input.name] = input.initial
  })

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={styles.form}>
          {inputs.map((input) => (
            <FormikTextInput
              key={input.name}
              name={input.name}
              placeholder={input.placeholder}
              style={styles.input}
              secureTextEntry={input.secureTextEntry}
              multiline={input.multiline} />
          ))}
          <DefaultButton text={submitText} onPress={handleSubmit} />
        </View>
      )}
    </Formik>
  )
}

export default DefaultForm
