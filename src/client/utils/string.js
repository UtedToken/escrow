export function convertToString(camelCase = '') {
	let output = ''
	for (let i = 0; i < camelCase.length; i++) {
		const char = camelCase.charAt(i)
		if (i === 0) {
			output = output + char.toUpperCase()
		} else if (char === char.toUpperCase()) {
			output = output + ' ' + char
		} else {
			output = output + char
		}
	}
	return output
}
