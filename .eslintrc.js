module.exports = {
    "extends": "airbnb-base",
    "parser": "babel-eslint",
    "plugins": [
        "import"
    ],
    "rules": {
        "indent": ["error", 4],
        "class-methods-use-this" : ["off"],
        "strict": 0
    },
    "env": {
        "browser": true,
        "node": true,
        "jasmine": true
    },
};
