import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'
import { goToRoute } from '../../routes'

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
		this.handleMenuClick = this.handleMenuClick.bind(this)
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
		goToRoute(e.key)
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
		role: state.user && state.user.role,
		drawer: !!state.ui.drawer,
	}
}
Main.displayName = 'Sider-Component'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, null],
	localize: true,
})
