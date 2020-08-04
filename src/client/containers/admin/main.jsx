import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../preprocess'
import { goToRoute, addOnRouteChange } from '../../routes'
import { getCurrentRoute } from '../container-helpers/routing'

/**
 * @description Sample Container
 * @type Container
 */
class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		this.getCurrentRoute = getCurrentRoute.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	/**
	 * onClick menu navigate to specific route
	 * @returns {*}
	 */
	handleMenuClick(e) {
		goToRoute('admin.' + e.key)
	}

	/**
	 * Render Method
	 * @returns {*}
	 */
	render() {
		return ComponentView.bind(this)()
	}
}

/**
 * Bind Redux Actions
 * @param dispatch
 * @returns {{Object}}
 */
const bindAction = (dispatch) => {
	return {}
}
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = (state) => {
	return {
		drawer: !!state.ui.drawer,
	}
}
Main.displayName = 'Admin-Container'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, null],
	localize: true,
})
