/**
 Sample Reducer
 */
import { ActionNames } from '../actions'
import { getError } from 'utils/request'

/**
 * Reducer Function
 * @param state
 * @param action
 * @returns {{}}
 */
export default function (state = [], action) {
	switch (action.type) {
		case ActionNames.GET_WORK_BY_USER: {
			if (!getError(action)) {
				return action.payload.data
			} else {
				return []
			}
		}
		case ActionNames.GET_DOCUMENTS:
			if (!getError(action)) {
				return action.payload.data
			} else {
				return []
			}
	}
	return state
}
