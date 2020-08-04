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
		case ActionNames.GET_PROJECTS:
			if (!getError(action)) {
				return action.payload.data
			}
	}
	return state
}
