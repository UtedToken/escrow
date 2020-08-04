/**
 * Convert RGB to Hex
 * @param r
 * @param g
 * @param b
 * @returns {string}
 */
export function rgbToHex(data) {
	if (!data) {
		return ''
	}
	const { r, g, b } = data
	return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
