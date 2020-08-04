import { ActionNames } from '../actions'
import { getError } from 'utils/request'

/**
 * Dashboard Reducer
 * @param state
 * @param action
 */
export default function (state = {}, action) {
	switch (action.type) {
		case ActionNames.GET_DASHBOARD: {
			if (!getError(action)) {
				return action.payload.data
			} else {
				return {}
			}
		}
	}
	return state
}
