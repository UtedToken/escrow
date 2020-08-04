'use strict'
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const paths = require('razzle/config/paths')
const autoprefixer = require('autoprefixer')
/**
 * Default Options
 * @type {{css: {dev: {sourceMap: boolean, importLoaders: number, modules: boolean}, pro: {sourceMap: boolean, importLoaders: number, minimize: boolean, modules: boolean}}, postcss: {dev: {ident: string, sourceMap: boolean}, pro: {dent: string, sourceMap: boolean}, plugins: [*]}, less: {dev: {sourceMap: boolean, includePaths: [*]}, pro: {sourceMap: boolean, includePaths: [*]}}}}
 */
const defaultOptions = {
	css: {
		dev: {
			sourceMap: true,
			importLoaders: 1,
			modules: false,
		},
		pro: {
			sourceMap: false,
			importLoaders: 1,
			minimize: true,
			modules: false,
		},
	},
	postcss: {
		dev: {
			ident: 'postcss',
			sourceMap: true,
		},
		pro: {
			dent: 'postcss',
			sourceMap: false,
		},
		plugins: [
			require('postcss-flexbugs-fixes'),
			autoprefixer({
				browsers: [
					'>1%',
					'last 4 versions',
					'Firefox ESR',
					'not ie < 9', // React doesn't contactUs IE8 anyway
				],
				flexbox: 'no-2009',
			}),
		],
	},
	less: {
		dev: {
			sourceMap: true,
			includePaths: [paths.appNodeModules],
		},
		pro: {
			sourceMap: false,
			includePaths: [paths.appNodeModules],
		},
	},
}
const modify = (baseConfig, { target, dev }, webpack, userOptions = {}) => {
	// stay immutable here
	const options = Object.assign({}, defaultOptions, userOptions)
	const config = Object.assign({}, baseConfig)
	// constants
	const __IS__NODE = target !== 'web'
	const DEV_VAR = dev ? 'dev' : 'pro'
	// loaders
	const cssLoader = {
		loader: require.resolve('css-loader'),
		options: options.css[DEV_VAR],
	}
	const lessLoader = {
		loader: require.resolve('less-loader'),
		options: Object.assign({}, options.less[DEV_VAR], {
			javascriptEnabled: true,
			modifyVars: options.theme,
		}),
	}
	// loaders
	const postCssLoader = {
		loader: require.resolve('postcss-loader'),
		options: Object.assign({}, options.postcss[DEV_VAR], {
			plugins: () => options.postcss.plugins,
		}),
	}

	const styleLoader = {
		loader: require.resolve('style-loader'),
		options: options.style,
	}
	const lessRule = {
		test: /\.less$/,
		use: __IS__NODE
			? [
					{
						loader: require.resolve('css-loader/locals'),
						options: {
							importLoaders: 1,
						},
					},
			  ]
			: [
					dev ? styleLoader : MiniCssExtractPlugin.loader,
					cssLoader,
					postCssLoader,
					lessLoader,
			  ],
	}

	config.module.rules = [...config.module.rules, lessRule]
	return config
}

module.exports = modify
