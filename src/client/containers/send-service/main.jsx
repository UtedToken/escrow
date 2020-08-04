import React, { Component } from 'react'
import ComponentView from './view'
import { message } from 'antd'
import preProcess from 'containers/preprocess'
import { createAction, ActionNames } from 'app-redux/actions'
import { Form } from 'antd'
const { create } = Form
const spinningSelector = '.send'
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
		this.send = this.send.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	async send() {
		const { send, getData, form, hideModal } = this.props
		const { validateFieldsAndScroll } = form
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			const { email } = values
			window.startSpinning(spinningSelector)
			try {
				const { error, payload } = await send(email)
				if (error) {
					throw payload.response
				}
				if (getData instanceof Function) {
					getData()
				}
				message.success('Please check your email.')
				hideModal()
			} catch (e) {
				if (e.status === 400) {
					message.error('This Customer does not have a valid email')
				} else {
					message.error('Error while sending Email')
				}
			}
			window.stopSpinning(spinningSelector)
		})
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
		send: (email) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'service',
					entityId: 'send/' + key,
					email,
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
Main.displayName = 'Send-Container'
//Pre process the container with Redux Plugins
export default preProcess(create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
