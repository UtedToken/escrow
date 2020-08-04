/*
 Bootstrap redux
 */
import { createStore, applyMiddleware, compose } from 'redux'
import createRootReducer from './reducers'
import { history, middleware, enhancers, initialState } from './config'
import {
	configureLocalization,
	localeReducer,
	initialState as localizeInitialState,
} from './third-party/localization'
import { routerReducer } from 'react-router-redux'
import { Translations } from '../config'
import { EventEmitter } from 'fbemitter'
import { configureSocketListeners, socket } from './config/middleware'

import { isSSR } from '../utils/web'
import { firebaseReducer } from 'react-redux-firebase'

/**
 Combine enhancers and middlewares
 */
const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers)
/**
 * Create Third party reducers
 * @type {{locale, routing: *}}
 */
const thirdPartyReducers = {
	locale: localeReducer,
	routing: routerReducer,
	firebase: firebaseReducer,
}
/**
 * Get Third Party Plugins initial state while server side rendering e.g
 * localization
 * @param req
 * @returns {{locale: {languages, translations}}}
 */
const getThirdPartyInitialState = (req) => {
	return {
		//Localize Initial State is only need for the case of Server Side Rendering
		locale: localizeInitialState(req),
	}
}
/**
 * Create Redux Store = initialPreloadedState might be computed on server side
 * In that case its concatenated as a argument
 * @param initialPreloadedState
 * @returns {*}
 */
const store = function (initialPreloadedState, serverConfig) {
	/**
	 * This method is used on server side also so handling for both is done
	 * Third party initial state is only need for server side rendering
	 */
	const { req } = serverConfig || {}

	//Check for server side rendering
	let isClientLoaded = !isSSR()

	if (isClientLoaded) {
		/**
		 * Client Side Request
		 */
		return createStore(
			createRootReducer(thirdPartyReducers),
			{
				...initialPreloadedState,
				...initialState,
				emitter: new EventEmitter(),
			},
			composedEnhancers,
		)
	} else {
		return createStore(
			createRootReducer(thirdPartyReducers),
			{
				...initialPreloadedState,
				...initialState,
				...getThirdPartyInitialState(req),
			},
			composedEnhancers,
		)
	}
}

export function configureActions(dispatch) {
	/**
	 * Configure Third Party Redux Plugins here that require access to dispatch
	 */
	//Localization
	configureLocalization(dispatch, Translations)
	/**
	 * Configure Socket IO Listeners
	 *
	 * The reason we are configuring here is because we need dispatch
	 * function,socket and socketIoActions at one place and we have put
	 * all socketIo Related Redux handling in socket-io.js middleware
	 */
	//configureSocketListeners(dispatch,socket,socketIoActions);
}

export { history, initialState }
export default store
