import axios from 'axios'

export default axios.request

/**
 * Get Error for a request
 * @param action
 * @returns {*}
 */
export function getError(action) {
	let error
	if (action.error || getResponseError(action.payload)) {
		error = getResponseError(action.payload)
		if (!error) {
			error = {
				message: 'Response was not success',
			}
		}
	} else {
		if (
			typeof action.payload.data.success !== 'undefined' &&
			!action.payload.data.success
		) {
			error = {
				message: 'Response was not success',
			}
		}
	}

	return error
}

/**
 * Get Error from response
 * @param response
 */
export function getResponseError(response) {
	if (!response) {
		throw new Error('Response can not be empty for a request')
	}
	return (response.data || {}).error
}
