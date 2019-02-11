module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "env": {
        browser: true,
        node: true,
        jest: true
    },
    "rules": {
        "semi": [2, 'never'],
        "react/jsx-filename-extension": [1, { "extensions": [".js"] } ],
    }
};