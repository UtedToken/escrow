/**
 * Authentication Reducer
 */
import { ActionNames } from '../actions'
import { getError } from '../../utils/request'

/**
 * Create entity reducer based on configuration
 * @param entityName
 * @param config
 * @returns {Function}
 */
export default function (entityName, config) {
	config = config || {}
	const initialState = null
	return function (state = initialState, action) {
		switch (action.type) {
			case ActionNames.GET_ENTITY + '_' + entityName:
				if (!getError(action)) {
					state = {
						...state,
					}
					state = {
						...action.payload.data,
					}
					return state
				} else {
					return initialState
				}
			case ActionNames.LOGOUT:
				return initialState
		}
		return state
	}
}
