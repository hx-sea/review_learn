const path = require('path');

const OutLogPlugin = require('./plugin/OutLogPlugin');

module.exports = {
	mode: 'production',
	entry: {
		index: './src/index.js',
	},
	output: {
		filename: '[name].js',
	},
	// optimization: {
	// 	runtimeChunk: 'single',
	// 	splitChunks: {
	// 		cacheGroups: {
	// 			commons: {
	// 				chunks: 'initial',
	// 				minChunks: 2,
	// 				minSize: 0,
	// 			},
	// 			vendor: {
	// 				test: /node_modules/,
	// 				chunks: 'initial',
	// 				name: 'vendor',
	// 				enforce: true,
	// 			},
	// 		},
	// 	},
	// },
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					'console-loader',
					{
						loader: 'company-loader',
						options: {
							sign: 'we-doctor@2021',
						},
					},
				],
			},
		],
	},
	plugins: [new OutLogPlugin({ outFileName: 'buildInfo' })],
	resolveLoader: {
		modules: [path.resolve(__dirname, './loader'), 'node_modules'], // 先去找node_modules目录，没有再去loader中找
	},
};
