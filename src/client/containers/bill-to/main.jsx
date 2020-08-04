import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'
import { createAction, ActionNames } from 'app-redux/actions'
import { Form, message } from 'antd'
const { create } = Form
const spinningSelector = '.billto'
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
		this.handleSubmit = this.handleSubmit.bind(this)
		this.setValidations()
	}

	setValidations() {
		const { record } = this.props
		const { email } = record || {}
		this.validations = {
			billTo: {
				rules: [
					{
						required: true,
						message: 'Bill To is Required',
					},
				],
			},
			email: {
				rules: [
					{
						required: true,
						message: 'Email is Required',
					},
				],
				initialValue: email,
			},
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	handleSubmit(event) {
		const { form, sendEmail, hideModal } = this.props
		const { validateFieldsAndScroll } = form
		event.preventDefault()
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			window.startSpinning(spinningSelector)
			try {
				const { error, payload } = await sendEmail(values)
				if (error) {
					throw payload.response
				}
				if (hideModal instanceof Function) {
					hideModal()
				}
				message.success('Email Sent')
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
const bindAction = (dispatch, ownProps) => {
	const { record } = ownProps
	const { key } = record
	return {
		sendEmail: (data) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'invoice/billTo/' + key,
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
const mapStateToProps = (state) => {
	return {}
}
Main.displayName = 'Sample-Container'
//Pre process the container with Redux Plugins
export default preProcess(create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
