import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'
import { Form, message } from 'antd'
import { getFirstError } from 'utils/antd'
import { createAction, ActionNames } from 'app-redux/actions'

const spinningSelector = '.new-form'

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
		this.setValidations()
	}

	/**
	 * Sets Validations for fields
	 */
	setValidations() {
		const { translate } = this.props
		this.validations = {
			title: {
				rules: [
					{
						required: true,
						message: translate('common.firstName.error.required'),
					},
				],
			},
			body: {
				rules: [
					{
						required: true,
						message: translate('common.firstName.error.required'),
					},
				],
			},
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	handleSubmit(event) {
		event.preventDefault()
		const { validateFieldsAndScroll } = this.props.form
		const { translate, data, hideModal, sendNotifications } = this.props
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			window.startSpinning(spinningSelector)
			try {
				const action = await sendNotifications({
					ids: data.keys || [],
					notification: values,
				})
				if (!action.error) {
					message.success(translate('common.changes.save.success'))
					hideModal()
				} else {
					throw action.payload
				}
			} catch (err) {
				console.log(err)
				err = (err.response || {}).data || {}
				if (err.code && err.code === 'auth/email-already-exists') {
					message.error(translate('signUp.duplicate.email'))
				} else {
					message.error(translate('common.changes.save.error'))
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
const bindAction = (dispatch) => {
	return {
		createUser: (data) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					adminAccess: true,
					entityName: 'users',
					data,
				}),
			)
		},
		sendNotifications: (data) => {
			return dispatch(createAction(ActionNames.SEND_NOTIFICATIONS, data))
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
Main.displayName = 'Notification-Modal'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
