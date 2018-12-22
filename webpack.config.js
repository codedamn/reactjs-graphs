const path = require('path')

const source = path.resolve(__dirname, 'source')
const build = path.resolve(__dirname, 'build')

module.exports = {
  entry: path.join(source, 'index.js'),
  output: {
    path: build,
	filename: 'index.js',
	publicPath: '/'
  },
  mode: process.env.NODE_ENV || 'development',
  devServer: {
	publicPath: '/',
	port: 9999,
	index: 'index.html',
	disableHostCheck: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css)$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      }
    ]
  },
  resolve: {
	alias: { // to reduce bundle size
		"konva": path.resolve(source, "konva.js"),
	}
  }
};