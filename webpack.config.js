/* eslint-disable */
var webpack = require('webpack');
var path = require('path');

module.exports = {
	devtool: 'inline-source-map',
	entry: [
		'webpack-hot-middleware/client',
		'./client/index.js',
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					plugins: [
						['react-transform', 
							{
		          	'transforms': 
		          	[
			          	{
				            'transform': 'react-transform-hmr',
				            'imports': ['react'],
				            'locals': ['module']
			          	}, 
			          	{
				            'transform': 'react-transform-catch-errors',
				            'imports': ['react', 'redbox-react']
			          	}
		          	]
		        	}
		        ]
					]
				}
			},
			{
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      }
		]
	},
	sassLoader: {
    includePaths: [path.resolve(__dirname, "./public/stylesheets/")],
    outFile: __dirname + '/dist/bundle/bundle.css'
  },
	output: {
		filename: 'bundle.js',
		path: __dirname + '/dist/bundle/',
		publicPath: '/static/'
	},
	plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
	]
}
