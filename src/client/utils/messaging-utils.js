/**
 * Gets Error Message
 * @param message
 * @returns {{type: string, message: *}}
 */
export function getErrorMessage(message) {
	return {
		type: 'error',
		message: message,
	}
}

/**
 * Gets Success Message
 * @param message
 * @returns {{type: string, message: *}}
 */
export function getSuccessMessage(message) {
	return {
		type: 'success',
		message: message,
	}
}
