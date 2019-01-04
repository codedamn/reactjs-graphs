const path = require('path')

const source = path.resolve(__dirname, 'source')
const build = path.resolve(__dirname, 'build')
const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: path.join(source, production ? 'Graph.js' : 'index.js'),
  output: {
    path: build,
	filename: 'index.js',
	publicPath: '/',
	libraryTarget: production ? 'commonjs2': undefined
  },
  mode: process.env.NODE_ENV || 'development',
  devServer: {
	host: '0.0.0.0',
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