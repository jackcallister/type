module.exports = {
  entry: './scripts/components/app.js',
  output: {
    filename: './scripts/dist/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  }
};
