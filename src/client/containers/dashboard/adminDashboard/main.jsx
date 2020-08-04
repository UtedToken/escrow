import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { ActionNames, createAction } from '../../../redux/actions'

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
	async componentDidMount() {
		try {
			const action = await this.props.getDashboard()
			if (action.error) {
				throw action
			}
		} catch (e) {
			console.warn('Error while getting dashboard', e)
		}
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
		getDashboard: () => {
			const action = createAction(ActionNames.GET_ENTITIES, {
				entityName: 'dashboard',
				url: 'stats',
			})
			action.type = ActionNames.GET_DASHBOARD
			return dispatch(action)
		},
	}
}
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = ({ dashboard, user }) => {
	return {
		user,
		dashboard,
	}
}
Main.displayName = 'Dashboard'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
