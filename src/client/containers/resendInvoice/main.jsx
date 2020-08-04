import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'
import { message } from 'antd'
import { ActionNames, createAction } from '../../redux/actions'
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
		this.resendInvoice = this.resendInvoice.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	async resendInvoice() {
		const { resendInvoice, record } = this.props
		const { email } = record

		window.startSpinning(spinningSelector)
		try {
			const { error, payload } = await resendInvoice()
			if (error) {
				throw payload.response
			}
			message.success('Invoice Sent Successfully to ' + email)
		} catch (e) {
			message.error('Error occured while sending invoice')
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
const bindAction = (dispatch, { record }) => {
	const { key } = record
	return {
		resendInvoice: () => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'invoice/sendInvoice/' + key,
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
