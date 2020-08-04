/**
 * Security and authentication related helper methods
 */
import axios from 'axios'

/**
 * Set Public API Key for public tables access
 * @type {string}
 */
axios.defaults.headers.common['authorization'] = ''

/**
 * Set Authorization Header
 * @param auth
 */
export function setAuthorizationHeader(auth) {
	if (auth && auth.stsTokenManager && auth.stsTokenManager.accessToken) {
		axios.defaults.headers.common['authorization'] =
			auth.stsTokenManager.accessToken
	}
}

/**
 * Clear Authorization Header
 *
 */
export function clearAuthorizationHeader() {
	axios.defaults.headers.common['authorization'] = ''
}
