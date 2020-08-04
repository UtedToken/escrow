import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../preprocess'
import { Form, message } from 'antd'
import { createAction, ActionNames } from '../../redux/actions'
import { goToRoute } from '../../routes'

const spinningSelector = '.general-form.forgetPassword'

/**
 * @description Login Form Container
 * @type Container
 */
class Main extends Component {
	/**
	 * Constructor
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
			email: {
				rules: [
					{ required: true, message: translate('common.email.error.required') },
					{ type: 'email', message: translate('common.email.error.invalid') },
				],
			},
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	/**
	 * toggleForm function switches between modals of join form
	 * @param value
	 */
	toggleForm(value) {
		const { setUiProperty } = this.props
		setUiProperty({
			name: 'activeTab',
			value,
		})
	}

	/**
	 * On Submit of  Form
	 * @param event
	 */
	handleSubmit(event) {
		event.preventDefault()
		const { validateFieldsAndScroll, resetFields } = this.props.form
		const { translate, passwordReset, ui } = this.props
		validateFieldsAndScroll(async (errors, { email }) => {
			if (errors) {
				return
			}
			window.startSpinning(spinningSelector)
			try {
				const { error } = await passwordReset({ email })
				if (error) {
					throw error
				}
				resetFields()
				message.success(translate('forgot.success'))
				if (ui.activeTab) {
					this.toggleForm('signIn')
				} else {
					goToRoute('login')
				}
			} catch (e) {
				message.error(translate('forgot.error'))
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
		setUiProperty: (data) => {
			return dispatch(createAction(ActionNames.UI_SET_PROPERTY, data))
		},
		passwordReset: ({ email }) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'password-reset',
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
const mapStateToProps = ({ ui, emitter }) => {
	return {
		ui,
		emitter,
	}
}
Main.displayName = 'Forgot-Password-Form'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
