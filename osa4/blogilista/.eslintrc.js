module.exports = {
  extends: "airbnb",
  env: {
    jest: true,
  },
  settings: {
    react: {
      version: "latest",
    },
  },
  rules: {
    quotes: [
      "error",
      "double",
    ],
    semi: [
      "error",
      "never",
    ],
    "no-console": 0,
  },
}
