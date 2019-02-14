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
        "jsx-a11y/label-has-associated-control": 0,
        "jsx-a11y/label-has-for": 0,
        "no-underscore-dangle": 0,
    }
};