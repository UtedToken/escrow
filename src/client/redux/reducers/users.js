/**
 * Authentication Reducer
 */
import { ActionNames } from '../actions'
import { getError } from '../../utils/request'

const initialState = { users: [], nextPageToken: null }
/**
 * Reducer Function
 * @param state
 * @param action
 * @returns {*}
 */
export default function (state = initialState, action) {
	switch (action.type) {
		case ActionNames.GET_ENTITIES:
			const entityName = getEntityName(action.payload)
			if (entityName !== 'users') {
				return state
			}
			if (!getError(action)) {
				let data = action.payload.data
				return {
					...data,
				}
			} else {
				return initialState
			}
		case ActionNames.LOGOUT:
			return initialState
	}
	return state
}

/**
 * Get Entity name
 * @param payload
 * @returns {*}
 */
function getEntityName(payload) {
	const { config } = payload
	const parts = (config.url || '').split('/')
	return parts[parts.length - 1]
}
