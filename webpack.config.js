module.exports = {
  entry: './js/app.js',
  output: {
    //path: __dirname, 
    filename: './bundle.js',
  },

  module: {
    loaders: [
        {
            exclude: /node_modules/, 
            loader: "babel-loader" 
        }
    ]
  }
};