import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'
import { createAction, ActionNames } from '../../redux/actions'
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
		const { getDashboard } = this.props
		try {
			const { error, payload } = await getDashboard()
			if (error) {
				throw payload.response
			}
		} catch (e) {
			console.log(e)
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
const mapStateToProps = ({ dashboard, config }) => {
	const { configuration } = config || {}
	const { CURRENCY } = configuration || {}
	return {
		dashboard,
		CURRENCY,
	}
}
Main.displayName = 'Sample-Container'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
