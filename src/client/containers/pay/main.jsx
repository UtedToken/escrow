import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'
import { message } from 'antd'
import { goToRoute } from '../../routes'
import { createAction, ActionNames } from 'app-redux/actions'
const spinningSelector = '.payment'
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
		this.state = {
			total: 0,
		}
		this.onPayment = this.onPayment.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	async componentDidMount() {
		const { getInvoice, routeParams } = this.props
		const { id } = routeParams
		window.startSpinning(spinningSelector)
		try {
			const { error, payload } = await getInvoice(id)
			if (error) {
				throw payload.response
			}
			const { data } = payload
			console.log(data)
			const { parts, payment, labourTransportCosts, key, id: invoiceId } =
				data || {}
			if (payment) {
				//message.success('This invoice hasAlready Paid');
				this.setState({
					payment,
					jobNumber: key,
					invoiceId,
				})
			} else {
				const total =
					(parts || []).reduce((sum, item) => {
						const { partCost } = item
						return sum + (partCost || 0) || 0
					}, 0) + (labourTransportCosts || 0)
				this.setState({
					total,
					invoiceId,
					jobNumber: key,
				})
			}
		} catch (e) {
			console.error(e)
			message.error('No invoice exists for this service job.')
			goToRoute('login')
		}
		window.stopSpinning(spinningSelector)
	}

	async onPayment(key, data) {
		const { onPayment, routeParams, updateInvoice } = this.props
		const { id } = routeParams
		window.startSpinning(spinningSelector)
		try {
			let action = await onPayment(key, data)
			if (action.error) {
				throw action.payload.response
			}
			action = await updateInvoice(id, {
				payment: action.payload.data,
			})
			if (action.error) {
				throw action.payload.response
			}
			message.success('Payment Successful.')
			this.setState({
				payment: {
					method: key,
					...action.payload.data,
				},
			})
		} catch (e) {
			console.log(e)
			message.error('Error while processing payment')
		}
		window.stopSpinning(spinningSelector)
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
		getInvoice: (entityId) => {
			return dispatch(
				createAction(ActionNames.GET_ENTITY, {
					entityId,
					entityName: 'invoice',
				}),
			)
		},
		onPayment: (method, data) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'transaction',
					method,
					data,
				}),
			)
		},
		updateInvoice: (entityId, data) => {
			return dispatch(
				createAction(ActionNames.UPDATE_ENTITY, {
					entityId,
					entityName: 'invoice',
					...data,
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
const mapStateToProps = ({ config }) => {
	const { payment, configuration } = config || {}
	const { gateway } = payment || {}
	const { CURRENCY, WEBSITELOGO } = configuration || {}
	return {
		gateway,
		CURRENCY,
		WEBSITELOGO,
	}
}
Main.displayName = 'Pay-Container'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
