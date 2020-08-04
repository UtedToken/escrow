/**
 * Root Reducer for all reducers
 */
import { combineReducers } from 'redux'
import user from './user'
import config from './config'
import ui from './ui'
import users from './users'
import dashboard from './dashboard'
import projects from './projects'
import createEntityReducer from './create-entity-reducer'
import createSingleEntityReducer from './create-single-entity-reducer'
import CrudEntityConfig from '../../crud-entity-config'
const otherEntities = ['document-outputs']
const createRootReducer = function (thirdPartyReducers) {
	let reducers = {
		...thirdPartyReducers,
		config,
		user,
		ui,
		userProjects: projects,
		dashboard,
		/**
		 * The reason why here emitter is not initialized as due
		 * to server side rendering we should keep it to null and
		 * initialize only when client side is loaded
		 * @param state
		 */
		emitter: (state = null) => state,
		users: users,
	}
	Object.keys(CrudEntityConfig).map((key) => {
		reducers[key] = createEntityReducer(key, CrudEntityConfig[key].reducer)
		reducers[key + '_single'] = createSingleEntityReducer(
			key,
			CrudEntityConfig[key].reducer,
		)
	})
	otherEntities.map((key) => {
		reducers[key] = createEntityReducer(key)
		reducers[key + '_single'] = createSingleEntityReducer(key)
	})
	return combineReducers(reducers)
}
export default createRootReducer
