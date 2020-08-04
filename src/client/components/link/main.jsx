/**
 * Wrapper Component to provide linking functionality
 */
import React, { Component } from 'react'
import ComponentView from './view'
import { getRouteUrl } from '../../routes'
import { toQueryString } from '../../utils/web'

export default class Main extends Component {
	getRoute() {
		const { routeKey, routeParams, queryParams } = this.props
		if (routeKey) {
			const route =
				getRouteUrl(routeKey, routeParams) +
				(queryParams ? toQueryString(queryParams) : '')
			return route
		}
		return
	}

	getLinkProps() {
		let newProps = {
			...this.props,
		}
		/**
		 * If route key exists take it as application route else
		 * use it as a normal Link
		 */
		//delete newProps.to;
		delete newProps.routeKey
		delete newProps.routeParams
		delete newProps.queryParams
		return newProps
	}

	render() {
		return ComponentView.bind(this)()
	}
}
Main.displayName = 'Custom-Link'
