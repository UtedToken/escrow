import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'
import { message } from 'antd'
import { ActionNames, createAction } from 'app-redux/actions'
const spinningSelector = '.resend-invoice'
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
		this.markAsPaid = this.markAsPaid.bind(this)
		this.state = {
			paid: false,
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	async markAsPaid() {
		const { markAsPaid, getDashboard, getTableData } = this.props
		window.startSpinning(spinningSelector)
		try {
			const { error, payload } = await markAsPaid()
			if (error) {
				throw payload.response
			}
			message.success('This invoice has been marked as paid')
			if (getTableData instanceof Function) {
				getTableData()
			}
			setTimeout(async () => {
				try {
					getDashboard()
				} catch (e) {
					console.error('Error while getting dashboard data', e)
				}
				window.stopSpinning(spinningSelector)
			}, 1000)
			this.setState({ paid: true })
		} catch (e) {
			window.stopSpinning(spinningSelector)
			console.error(e)
			message.error('Error occured while marking invoice as paid')
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
const bindAction = (dispatch, { record }) => {
	const { key } = record
	return {
		getDashboard: () => {
			const action = createAction(ActionNames.GET_ENTITIES, {
				entityName: 'dashboard',
				url: 'stats',
			})
			action.type = ActionNames.GET_DASHBOARD
			return dispatch(action)
		},
		markAsPaid: () => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'invoice/markAsPaid/' + key,
				}),
			)
		},
	}
}
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = (state) => {
	return {}
}
Main.displayName = 'Sample-Container'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
