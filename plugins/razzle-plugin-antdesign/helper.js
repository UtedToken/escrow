/**
 * Helper Functions
 */
'use strict'

const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder')
const babelLoaderFinder = makeLoaderFinder('babel-loader')

module.exports = {
	babelLoaderFinder,
}
