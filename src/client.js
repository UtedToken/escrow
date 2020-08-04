import React from 'react'
import { hydrate } from 'react-dom'

/**
 * This is the client side entry point for the React app.
 */
import { Provider } from 'react-redux'
import { routes } from './client/routes'
import { Router } from 'react-router'
import './client/styles'
import createStore, { history, configureActions } from './client/redux'
//For Spinner Functionality
import './client/utils/spinner'
//For providing polyfill for safari and older browsers for toBlob in canvas
import 'blueimp-canvas-to-blob'
import { ConfigProvider } from 'antd'
import enUS from 'antd/lib/locale/en_US'
const store = createStore()
const finalRoutes = routes(store)

/**
 * Configure actions for third party or which require
 * the use of dispatch mevthod outside containers
 */
configureActions(store.dispatch)
hydrate(
	<Provider store={store}>
		<ConfigProvider locale={enUS}>
			<Router history={history}>{finalRoutes}</Router>
		</ConfigProvider>
	</Provider>,
	document.getElementById('root'),
)

if (module.hot) {
	module.hot.accept()
}
