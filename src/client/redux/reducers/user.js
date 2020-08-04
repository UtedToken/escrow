/**
 * Authentication Reducer
 */
import { ActionNames } from '../actions'
import { getError } from '../../utils/request'

/**
 * Reducer Function
 * @param state
 * @param action
 * @returns {*}
 */
export default function (state = null, action) {
	switch (action.type) {
		case ActionNames.GET_PROFILE:
			if (!getError(action)) {
				let data = action.payload.data
				return {
					...data,
				}
			} else {
				return null
			}
		case ActionNames.UPDATE_CURRENT_USER:
			if (!getError(action)) {
				let data = action.payload.data
				return {
					...data,
				}
			} else {
				return null
			}
		case ActionNames.LOGOUT:
			return null
	}
	return state
}
