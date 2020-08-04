'use strict'
/**
 * For Antd Design to work we need to configure babel import plugin
 * in order to customize antd design themes and use its less files
 */
const { babelLoaderFinder } = require('./helper')
const defaultOptions = {
	style: true,
	openBabelImport: true,
	styles: {},
}
const nodeExternals = require('webpack-node-externals')

const modify = (baseConfig, { target, dev }, webpack, userOptions = {}) => {
	// stay immutable here
	const options = Object.assign({}, defaultOptions, userOptions)
	const config = Object.assign({}, baseConfig)

	// babel loader check
	const babelLoader = config.module.rules.find(babelLoaderFinder)
	if (!babelLoader) {
		throw new Error(
			"'babel-loader' was erased from config, we need it necessary",
		)
	}

	const __IS__NODE = target !== 'web'
	/**
	 * Don't configure in case of server
	 */
	if (options.openBabelImport && !__IS__NODE) {
		const babel_import_plugin = [
			'import',
			{
				libraryName: 'antd',
				libraryDirectory: __IS__NODE ? 'lib' : 'lib',
				...(__IS__NODE ? {} : { style: options.style }),
			},
		]
		const plugins = babelLoader.use[0].options.plugins
		if (!plugins) {
			config.module.rules[2].use[0].options.plugins = [babel_import_plugin]
		} else {
			config.module.rules[2].use[0].options.plugins = [
				...plugins,
				babel_import_plugin,
			]
		}
	}

	config.externals =
		target === 'node'
			? [
					nodeExternals({
						whitelist: [
							dev ? 'webpack/hot/poll?300' : null,
							/\.(eot|woff|woff2|ttf|otf)$/,
							/\.(svg|png|jpg|jpeg|gif|ico)$/,
							/\.(mp4|mp3|ogg|swf|webp)$/,
							/\.(css|scss|sass|sss|less)$/,
							/^core-components/,
							/^app-redux/,
							/^containers/,
							/^core-styles/,
							/^utils/,
						].filter(Boolean),
					}),
			  ]
			: []
	return config
}
module.exports = modify
