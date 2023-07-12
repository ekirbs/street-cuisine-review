module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "commonjs": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/vue3-essential",
        "prettier"
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "parser": "babel-eslint"
    },
    "plugins": [
        "vue",
        "prettier"
    ],
    "rules": {
        "no-undef-init": "error",
        "no-duplicate-case": "error",
        "no-empty": "error",
        "no-extra-semi": "error",
        "no-func-assign": "error",
        "no-irregular-whitespace": "error",
        "no-unreachable": "error",
        "curly": "error",
        "dot-notation": "error",
        "eqeqeq": "error",
        "no-empty-function": "error",
        "no-multi-spaces": "error",
        "no-mixed-spaces-and-tabs": "error",
        "no-trailing-spaces": "error",
        "default-case": "error",
        "no-fallthrough": "error",
        "no-unused-vars": "error",
        "no-use-before-define": "error",
        "no-redeclare": "error",
        "brace-style": "error",
        "indent": ["error", 2],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "radix": "off",
        "prettier/prettier": "error"
    }
}
