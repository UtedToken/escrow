import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { Form, message } from 'antd'
import { getEmail } from '../../../utils/firebase'
import { ActionNames, createAction } from 'app-redux/actions'

const spinningSelector = '.security'

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
		this.state = {
			passwordState: {
				oldPassword: false,
				newPassword: false,
				confirmPassword: false,
			},
		}
	}

	/**
	 * Sets Validations for fields
	 */
	setValidations() {
		const { translate, user } = this.props
		const resetPasswordEnabled = this.resetPasswordEnabled()
		this.validations = {
			email: {
				rules: [
					{ required: true, message: translate('common.email.error.required') },
					{ type: 'email', message: translate('common.email.error.invalid') },
				],
				initialValue: user ? getEmail(user) : {},
			},
			oldPassword: {
				rules:
					resetPasswordEnabled || this.isEmailChanged()
						? [
								{
									required: true,
									message: translate('common.password.error.required'),
								},
						  ]
						: [],
				//initialValue : "123456"
			},
			password: {
				rules: resetPasswordEnabled
					? [
							{
								required: true,
								message: translate('common.password.error.required'),
							},
							{ min: 6, message: translate('common.password.error.invalid') },
					  ]
					: [],
				//initialValue : "123456"
			},
		}
	}

	/**
	 * Is Email changed
	 */
	isEmailChanged() {
		const { auth, form } = this.props
		return getEmail(auth) !== form.getFieldValue('email')
	}

	/**
	 * Force change state
	 */
	forceChangeState() {
		this.setState({
			dummy: !this.state.dummy,
		})
	}

	/**
	 * Reset Password enabled or not
	 */
	resetPasswordEnabled() {
		const { getFieldsValue } = this.props.form
		const values = getFieldsValue(['password', 'confirmPassword'])
		const { password, confirmPassword } = values
		let enabled = false
		if (password && password !== '') {
			enabled = true
		} else if (confirmPassword && confirmPassword !== '') {
			enabled = true
		}
		return enabled
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {
		const { emitter } = this.props
		emitter.once('AUTHENTICATED', () => {
			setTimeout(() => {
				this.setValidations()
				/**
				 * Force Re-Render
				 */
				this.forceChangeState()
			}, 200)
		})
	}

	// /**
	//  * Antd Validator for checking both passwords
	//  * @param rule
	//  * @param value
	//  * @param callback
	//  */
	// checkPassword(rule, value, callback) {
	//   const {getFieldValue}  = this.props.form;
	//   const {translate} = this.props;
	//   if(value!='' && value !== getFieldValue("password")){
	//     callback(translate("common.error.password.match"));
	//   } else {
	//     callback();
	//   }
	// }

	/**
	 * On Submit of  Form
	 * @param event
	 */
	handleSubmit(event) {
		event.preventDefault()
		const { validateFieldsAndScroll, resetFields } = this.props.form
		const { changePassword, translate } = this.props
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			if (values.oldPassword === values.password) {
				message.error(translate('resetPassword.error.password.match'))
				return
			}
			window.startSpinning(spinningSelector)
			try {
				const { error, payload } = await changePassword(values)
				if (error) {
					throw payload.response.data
				}
				resetFields()
				message.success(translate('common.changes.save.success'))
			} catch (e) {
				message.error(e.message)
			}
			window.stopSpinning(spinningSelector)
		})
	}

	/**
	 * Show or hide Password
	 */
	togglePasswordVisible(element) {
		const passwordState = {
			...this.state.passwordState,
		}
		passwordState[element] = !passwordState[element]
		this.setState({
			passwordState,
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
		changePassword: (data) => {
			return dispatch(createAction(ActionNames.UPDATE_CURRENT_USER, data))
		},
	}
}
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = (state) => {
	return {
		emitter: state.emitter,
		auth: state.firebase.auth,
		user: state.user,
	}
}
Main.displayName = 'Security-Settings-Form'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
