module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    extends: [
      "airbnb-typescript",
      "plugin:react/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
      "plugin:prettier/recommended",
    ],
    plugins: ["react-hooks", "import", "simple-import-sort"],
    parserOptions: {
      ecmaVersion: 2018,
      sourceType: "module",
      project: "./tsconfig.eslint.json",
      ecmaFeatures: {
        jsx: true,
      },
    },
    ignorePatterns: [],
  
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-use-before-define": ["error", { functions: false, classes: true }],
      "@typescript-eslint/no-unused-vars": "error",
      "import/first": "error",
      "no-console": "error",
      "@typescript-eslint/naming-convention": "warn",
      "@typescript-eslint/camelcase": "off",
      "import/newline-after-import": "warn",
      "import/no-deprecated": "warn",
      "import/no-extraneous-dependencies": "off",
      "react/display-name": "off",
      "global-require": "off",
      "import/no-useless-path-segments": "warn",
      "react-hooks/exhaustive-deps": "warn", // Warns about potential holes in effect dependencies
      "react-hooks/rules-of-hooks": "error", // Enforces React Rules of Hooks
      "react/jsx-sort-props": "warn",
      "react/no-unescaped-entities": "warn",
      "simple-import-sort/sort": "warn",
      "react/jsx-props-no-spreading": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/jsx-wrap-multilines": ["error", {"declaration": false, "assignment": false}],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
};
  