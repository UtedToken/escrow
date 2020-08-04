/**
 * This is the client side entry point for the React app.
 */
import './styles'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { routes } from './routes'
import { Router } from 'react-router'
import createStore, { history, configureActions } from './redux'
//For Spinner Functionality
import './utils/spinner'
//For providing polyfill for safari and older browsers for toBlob in canvas
import 'blueimp-canvas-to-blob'
import { ConfigProvider } from 'antd'
//import enUS from 'antd/lib/locale-provider/en_US';
import enUS from 'antd/es/locale/en_US'
/**
 * Add the client app start up code to a function as window.webappStart.
 * The webapp's full HTML will check and call it once the js-content
 * DOM is created.
 */
window.webappStart = () => {
	const initialState = window.__PRELOADED_STATE__
	const store = createStore(initialState)
	/**
	 * Configure actions for third party or which require
	 * the use of dispatch method outside containers
	 */
	configureActions(store.dispatch)
	render(
		<Provider store={store}>
			<ConfigProvider locale={enUS}>
				<Router history={history}>{routes}</Router>
			</ConfigProvider>
		</Provider>,
		document.querySelector('.js-content'),
	)
}
