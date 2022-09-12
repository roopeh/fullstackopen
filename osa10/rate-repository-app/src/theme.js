import { Platform } from "react-native"

const theme = {
  colors: {
    primary: "#e1e4e8",
    secondary: "#24292e",
    white: "#fff",
    blue: "#0366d6",
    error: "#d73a4a", // red

    textPrimary: "#586069",
    textSecondary: "#fff"
  },
  paddings: {
    defaultPadding: 5,
    inputPadding: 10,
    contentPadding: 20
  },
  borders: {
    defaultWidth: 1,
    defaultRounding: 5
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "System"
    }),
  }
}

export default theme
