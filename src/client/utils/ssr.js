/**
 * Check if SSR or not
 * @returns {boolean}
 */
export function isSSR() {
	return typeof window === 'undefined'
}
