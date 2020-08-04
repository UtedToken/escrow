import { ActionNames } from '../actions'

export default function (state = {}, action) {
	switch (action.type) {
		case ActionNames.GET_CONFIGS: {
			if (action.error) {
				return {}
			}
			let { config } = action.payload.data
			config = config || []
			let newConfig = {}
			config.forEach((item) => {
				if (!newConfig[item.package]) {
					newConfig[item.package] = {}
				}
				newConfig[item.package][item.key] = item.value
			})
			return newConfig
		}
	}
	return state
}
