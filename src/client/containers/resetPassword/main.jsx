import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../preprocess'
import { Form, message } from 'antd'
import { goToRoute } from '../../routes'
import { ActionNames, createAction } from 'app-redux/actions'

const spinningSelector = '.main-container'

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
			password: {
				rules: [
					{
						required: true,
						message: translate('common.password.error.required'),
					},
					{ min: 6, message: translate('common.password.error.invalid') },
				],
			},
			confirmPassword: {
				rules: [
					{
						required: true,
						message: translate('common.confirmPassword.error.required'),
					},
					{ validator: this.checkPassword.bind(this), name: 'confirmPassword' },
				],
			},
		}
	}

	/**
	 * Antd Validator for checking both passwords
	 * @param rule
	 * @param value
	 * @param callback
	 */
	checkPassword(rule, value, callback) {
		const { getFieldValue } = this.props.form
		const { translate } = this.props
		if (value !== '' && value !== getFieldValue('password')) {
			callback(translate('common.error.password.match'))
		} else {
			callback()
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	async componentDidMount() {
		const { translate, location, validateToken } = this.props
		const { query } = location || {}
		const { token } = query || {}
		window.startSpinning(spinningSelector)
		try {
			const { error } = await validateToken(token)
			if (error) {
				throw error
			}
		} catch (e) {
			message.error(translate('resetPassword.error.invalidLink'))
			goToRoute('login')
		}
		window.stopSpinning(spinningSelector)
	}

	/**
	 * On Submit of  Form
	 * @param event
	 */
	handleSubmit(event) {
		event.preventDefault()
		const { validateFieldsAndScroll, resetFields } = this.props.form
		const { translate, location, resetPassword } = this.props
		const { token } = location.query
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			window.startSpinning(spinningSelector)
			try {
				if (token) {
					const { password } = values
					const { error, payload } = await resetPassword({
						token,
						password,
					})
					if (error) {
						throw payload.response.data
					}
					resetFields()
					message.success(translate('resetPassword.success'))
					goToRoute('login')
				} else {
					message.error(translate('resetPassword.error.invalidLink'))
				}
			} catch (e) {
				if (e.message) {
					message.error(e.message)
				} else {
					message.error(translate('resetPassword.error.server'))
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
		resetPassword: ({ token, password }) => {
			return dispatch(
				createAction(ActionNames.UPDATE_ENTITY, {
					entityName: 'password-reset',
					entityId: token,
					password,
				}),
			)
		},
		validateToken: (token) => {
			return dispatch(
				createAction(ActionNames.GET_ENTITY, {
					entityName: 'password-reset',
					entityId: token,
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
const mapStateToProps = ({ emitter }) => {
	return {
		emitter,
	}
}
Main.displayName = 'Reset-Password-Form'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
