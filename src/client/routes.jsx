/**
 * Contains Routing for the application
 */
import React from 'react'
import { Route, IndexRoute, Router } from 'react-router'
import { history } from './redux/config'
import { browserHistory } from 'react-router'
import Crud from './containers/crud'
import Dashboard from './containers/dashboard'
import Error404 from './containers/errors/404'
import Error401 from './containers/errors/401'
import Error500 from './containers/errors/500'
import ForgotPassword from './containers/forgotPassword'
import Home from './containers/home'
import Login from './containers/login'
import Main from './containers/main'
import Settings from './containers/settings'
import ResetPassword from './containers/resetPassword'
import Support from './containers/support'
import UnderConstruction from './containers/underConstruction'
import Pay from './containers/pay'
import { ModalUtils } from 'core-components/modal'
import { compile } from 'path-to-regexp'

import { routes as CrudEntityRoutes } from './crud-entity-config'

//Import Modals here
import UserForm from './containers/admin/user-form'
import ConfigurationForm from './containers/admin/configuration-form'
import GatewayForm from './containers/admin/payment-gateway-form'
import CustomerForm from './containers/admin/customer-form'
import TemplateForm from './containers/admin/template-form'
import PdfTemplateForm from './containers/admin/pdf-template-form'
/**
 * Route keys & Paths Map
 * @type {{Object}}
 */
const MainRoute = {
	component: Main,
	children: {
		home: {
			url: 'home',
			component: Home,
			routeProps: {
				header: 'secured',
			},
			children: {
				dashboard: {
					url: '',
					component: Dashboard,
				},
				settings: {
					url: 'settings',
					component: Settings,
				},
			},
		},
		login: {
			url: 'login',
			component: Login,
			routeProps: {
				public: true,
				guestOnly: true,
			},
		},
		pay: {
			url: 'pay/:id',
			component: Pay,
			routeProps: {
				public: true,
			},
		},
		resetPassword: {
			url: 'reset-password',
			component: ResetPassword,
			routeProps: { public: true, guestOnly: true },
		},
		forgotPassword: {
			url: 'forgot-password',
			component: ForgotPassword,
			routeProps: {
				public: true,
			},
		},
		error404: {
			url: 'error404',
			component: Error404,
			routeProps: { public: true },
		},
		error500: {
			url: 'error500',
			component: Error500,
			routeProps: { public: true },
			header: true,
		},
		error401: {
			url: 'error401',
			component: Error401,
			routeProps: { public: true },
		},
		underConstruction: {
			url: 'underConstruction',
			component: UnderConstruction,
			routeProps: { public: true },
		},
		support: {
			url: 'support',
			component: Support,
			routeProps: {
				public: true,
			},
		},
	},
}

/**
 * Configure Crud Entity Screens
 */
Object.keys(CrudEntityRoutes).map((key) => {
	let config = {
		url: key,
		component: Crud,
		routeProps: {
			...CrudEntityRoutes[key],
			...MainRoute.children.home.routeProps,
		},
	}

	if (CrudEntityRoutes[key].entityPage) {
		config.children = {}
		config.children['details'] = {
			url: ':id',
			...CrudEntityRoutes[key].entityPage,
			...MainRoute.children.home.routeProps,
		}
	}
	MainRoute.children.home.children[key] = config
})

/**
 * Constructs a route based on route data and parent Route URL
 */
const constructRoutes = (routeObjects, routeUrl, parentKey, parentProps) => {
	routeObjects = routeObjects || {}
	const routeKeys = Object.keys(routeObjects)
	routeUrl = routeUrl || ''
	if (!routeKeys || !Array.isArray(routeKeys) || routeKeys.length <= 0) {
		return null
	}

	let output = routeKeys.map((routeKey, index) => {
		let route = routeObjects[routeKey]
		const routeProps = route.routeProps || {}
		let props = {
			key: index,
			/**
			 * Create HOC to pass route props
			 * @param componentProps
			 * @returns {*}
			 */
			component: (componentProps) => {
				return (
					<div className={'route-container page'}>
						<route.component {...componentProps} {...routeProps} />
					</div>
				)
			},
		}
		if (route.url !== '') {
			props.path = routeUrl + '/' + route.url
		}
		props = {
			...props,
			...routeProps,
		}
		if (typeof parentProps !== 'undefined') {
			props.header = parentProps.header || props.header
		}
		props.routeKey = parentKey ? parentKey + '.' + routeKey : routeKey
		return route.url !== '' ? (
			<Route {...props}>
				{constructRoutes(route.children, props.path, routeKey, routeProps)}
			</Route>
		) : (
			<IndexRoute {...props}>
				{constructRoutes(route.children, props.path, routeKey, routeProps)}
			</IndexRoute>
		)
	})
	return output
}
/**
 * Route Declarations
 * Set publicHeader = false to disable publicHeader
 * Set public = true to allow guest access to a route
 * @type {XML}
 */
export const routes = (store) => {
	const { staticPages } = window.app.config || {}
	return (
		<Router>
			<Route path="/" component={MainRoute.component}>
				{constructRoutes(MainRoute.children)}
				<Route path="*" component={Error404} />
			</Route>
		</Router>
	)
}
/**
 * Returns the route link url for a given route key
 * @param key
 * @returns {*}
 */
export function getRouteUrl(key, params) {
	if (!key) {
		return null
	}
	let links = (key || '').split('.')
	let url = ''
	let routes = MainRoute.children
	if (!routes[links[0]]) {
		return null
	}
	links.map((link) => {
		if (routes[link]) {
			if (url === '/') {
				url = url + routes[link].url
			} else {
				url = url + '/' + routes[link].url
			}
			//getLinkUrl(routes[link].url);
			routes = routes[link].children || {}
		} else {
			console.log(
				'No such route key present ' +
					link +
					' while parsing routeKey - ' +
					key,
			)
		}
	})
	url = url.replace('//', '/')
	if (params) {
		return compile(url)(params)
	} else {
		return url
	}
}

export function getLinkUrl(url) {
	let parts = url.split('(')
	if (parts.length > 1) {
		return parts[0]
	}
	parts = url.split(':')
	if (parts.length > 1) {
		return parts[0]
	}
	return url
}

/**
 * Returns the route Object route key
 * @param key
 * @returns {*}
 */
export function getRoute(key) {
	if (!key) {
		return null
	}
	let links = (key || '').split('.')
	let route = null
	let routes = MainRoute.children
	if (!routes[links[0]]) {
		return null
	}
	links.map((link) => {
		if (routes[link]) {
			route = routes[link]
			routes = routes[link].children || {}
		} else {
			console.log(
				'No such route key present ' +
					link +
					' while parsing routeKey - ' +
					key,
			)
			route = null
		}
	})
	return route
}

/**
 * Goes to a specific route
 * @param route
 * @param config - Config for Browser History
 */
export function goToRoute(route, config) {
	config = config || {}
	let url = getRouteUrl(route, config.routeParams || {})
	if (url && url !== '') {
		if (config.forceRefresh) {
			window.location.pathname = url
			if (config.search) {
				window.location.search = config.search
			}
		} else {
			browserHistory.push({
				pathname: url,
				search: '',
				...config,
			})
		}
	} else {
		//404 Handling
		//browserHistory.push("/404");
		goToRoute('home')
	}
}

/**
 * Go Back
 */
export function goBack() {
	history.goBack()
}

/**
 * Add Listener to route change
 * it is the responsibility of the
 * component which adds listener to remove
 * listener using unlisten method that is
 * returned
 * @param listener
 * @returns {*}
 */
export function addOnRouteChange(listener) {
	if (history && listener) {
		return history.listen((action, location) => {
			/**
			 * This is done because the current route in
			 * react-redux-router prop routes in component is
			 * not updated in time
			 */
			setTimeout(listener.bind(this, action, location))
		})
	}
}

const Modals = {
	UserForm,
	ConfigurationForm,
	GatewayForm,
	CustomerForm,
	TemplateForm,
	PdfTemplateForm,
}
setTimeout(() => {
	ModalUtils.setModalScenes(Modals)
})
