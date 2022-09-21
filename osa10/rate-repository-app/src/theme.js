import { Platform, View } from "react-native"

export const ListSeparator = () => <View style={{ height: theme.dividerHeight }} />

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
  },
  images: {
    avatarWidth: 50,
    avatarHeight: 50
  },
  dividerHeight: 10,
  dividerWidth: 10
}

export default theme
