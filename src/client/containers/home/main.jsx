import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../preprocess'
import { createAction, ActionNames } from '../../redux/actions'
import { getCurrentRoute } from '../container-helpers/routing'

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
		this.state = {
			confirm: false,
			smallScreens: false,
		}
		this.getCurrentRoute = getCurrentRoute.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {
		if (window.innerWidth < 767) {
			this.setState({
				smallScreens: true,
			})
		}
	}

	closeDrawer() {
		const { toggleDrawer, drawer } = this.props
		toggleDrawer(drawer)
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
	return {
		sampleAction: () => {
			return dispatch(createAction(ActionNames.SAMPLE_ACTION))
		},
		toggleDrawer: (drawer) => {
			return dispatch(
				createAction(ActionNames.UI_SET_PROPERTY, {
					name: 'drawer',
					value: !drawer,
				}),
			)
		},
	}
}
/**
 * Bind State to props
 * @returns {{Object}}
 * @param state
 */
const mapStateToProps = (state) => {
	return {
		horizontalMenu: state.ui.horizontalMenu,
		drawer: !!state.ui.drawer,
	}
}
Main.displayName = 'Home'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
