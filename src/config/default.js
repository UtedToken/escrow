/**
 * Common configuration for each environment
 * @type {{}}
 */
export default {
	HOST: process.env.SERVER || 'http://localhost:8080',
	API_PREFIX: '/api/',
}
