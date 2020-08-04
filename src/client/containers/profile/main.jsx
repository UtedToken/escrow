import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../preprocess'
import { createAction, ActionNames } from '../../redux/actions'

/**
 * @description Home Container
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
	componentDidMount() {}

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
	return {
		sampleAction: () => {
			return dispatch(createAction(ActionNames.SAMPLE_ACTION))
		},
	}
}
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
	}
}
Main.displayName = 'Profile'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
