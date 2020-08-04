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
	const initialState = { data: [], total: 0, from: null }
	return function (state = initialState, action) {
		switch (action.type) {
			case ActionNames.GET_ENTITIES + '_' + entityName:
				if (!getError(action)) {
					state = {
						...state,
					}

					if (config.processData instanceof Function) {
						action.payload = config.processData(action.payload)
					}

					if (action.payload.data instanceof Array) {
						state.data = action.payload.data || []
					} else {
						state.data = action.payload.data.data || []
						// Can be used if we want to enable client side caching of server data

						/*
                        const from = action.payload.data.from || action.payload.config.params.from;
                        if (typeof from !== 'undefined' && from === 0) {
                            state.data = action.payload.data.data || [];
                        }
                        else if (typeof from === 'undefined') {
                            state.data = action.payload.data.data || [];
                        } else {
                            state.data = (action.payload.data.data || []).concat(state.data);
                        }*/
						state.total = action.payload.data.total
						state.from = action.payload.config.params.from || null
					}
					return state
				} else {
					return initialState
				}

			case ActionNames.UPDATE_ENTITY + '_' + entityName:
				if (!getError(action)) {
					state = {
						...state,
						data: [...state.data],
					}

					if (config.processUpdateData instanceof Function) {
						action.payload = config.processUpdateData(action.payload)
					}
					const key = action.payload.data.key
					state.data.find((obj, index) => {
						if (obj.key === key) {
							state.data[index] = {
								...obj,
								...action.payload.data,
							}
							return true
						}
						return false
					})
					return state
				} else {
					return state
				}
			case ActionNames.LOGOUT:
				return initialState
		}
		return state
	}
}
