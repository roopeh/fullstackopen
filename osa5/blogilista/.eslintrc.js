module.exports = {
  extends: ["airbnb", "plugin:cypress/recommended"],
  env: {
    jest: true,
    browser: true,
  },
  settings: {
    react: {
      version: "detect",
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
    "no-alert": "off",
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/react-in-jsx-scope": "off",
  },
  plugins: [
    "react",
    "jest",
  ]
}
