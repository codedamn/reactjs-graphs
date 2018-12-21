const path = require('path')

const source = path.resolve(__dirname, 'frontend/source')
const compiled = path.resolve(__dirname, 'frontend/compiled')

module.exports = {
  entry: {
	  bundle_home: path.join(source,'index.js'),
  },
  output: {
    path: path.join(compiled, 'assets'),
	filename: 'js/[name].js', // [name] here refers to bundle_home
	publicPath: '/assets/'
  },
  mode: process.env.NODE_ENV || 'development',
  devServer: {
	publicPath: '/assets/',
	port: 9999,
	index: 'index.html',
	watchOptions: {
		ignored: /node_modules/
	},
	historyApiFallback: {
		index: 'index.html'
	},
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
  }
};