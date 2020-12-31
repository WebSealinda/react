const path = require('path')

module.exports = {
  entry: {
    home: path.join(__dirname, 'src/index.js'),
    help: path.join(__dirname, 'src/help/index.js')
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name]-[hash:8].js',
    // chunkFilename: '[name]-[id]-[hash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
  ]
}