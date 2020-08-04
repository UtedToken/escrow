import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { Form, message } from 'antd/lib/index'
import { createAction, ActionNames } from '../../../redux/actions'
import { delay } from '../../../utils/common'

const spinningSelector = '.general-form.login'

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
		this.state = {}
		this.toggleForm = this.toggleForm.bind(this)
	}

	/**
	 * toggleForm function switches between modals of join form
	 * @param name
	 */
	toggleForm(name) {
		const { setUiProperty } = this.props
		setUiProperty({
			name: 'activeTab',
			value: name,
		})
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
			password: {
				rules: [
					{
						required: true,
						message: translate('common.password.error.required'),
					},
				],
			},
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	async componentDidMount() {}

	/**
	 * On Submit of  Form
	 * @param event
	 */
	async handleSubmit(event) {
		event.preventDefault()
		const { validateFieldsAndScroll } = this.props.form
		const { firebase, translate, emitter } = this.props
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			window.startSpinning(spinningSelector)
			if (values.rememberMe) {
				firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
			} else {
				firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
			}
			let loggedIn = false
			try {
				await firebase.login(values)
				loggedIn = true
			} catch (e) {
				console.error(e)
			}

			window.stopSpinning(spinningSelector)
			if (loggedIn) {
				emitter.emit('AUTHENTICATED')
				await delay(1)
				message.success(translate('login.success'))
			} else {
				message.error(translate('login.invalid'))
			}
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
		login: (data) => {
			return dispatch(createAction(ActionNames.LOGIN, data))
		},
	}
}
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = ({ emitter, ui }) => {
	return {
		emitter,
		ui,
	}
}
Main.displayName = 'Login-Form'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
	withRouter: true,
})
