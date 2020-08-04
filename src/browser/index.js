/**
 * Dummy Browser for server side rendering
 * Normally we get window as undefined while server side rendering so to
 * tackle that where we know that we will need certain properties globally
 * in window or any other browser objects, Use this dummy browser
 *
 */
import config from '../config'

if (typeof window === 'undefined') {
	global.window = {}
}
window.app = {}
window.app.host = config.HOST
window.app.server = config.HOST + config.API_PREFIX
window.app.apiKey = config.API_KEY
window.app.firebaseConfig = config.firebase
