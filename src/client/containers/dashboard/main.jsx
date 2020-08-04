import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'

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
	}

	/**
	 * ComponentDidMount Hook
	 */
	async componentDidMount() {}

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
const mapStateToProps = ({ user }) => {
	return {
		user,
	}
}
Main.displayName = 'Dashboard'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
