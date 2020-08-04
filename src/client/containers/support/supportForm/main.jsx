import { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { Form, message } from 'antd/lib/index'
import { createAction, ActionNames } from '../../../redux/actions'

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
			message: {
				rules: [{ required: true, message: 'Please enter message' }],
			},
			name: {
				rules: [{ required: true, message: 'Please enter your name' }],
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
		const { form, submitEnquiry } = this.props
		const { validateFieldsAndScroll, resetFields } = form
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			window.startSpinning(spinningSelector)
			try {
				const { error, payload } = await submitEnquiry(values)
				if (error) {
					throw payload.response
				}
				resetFields()
				message.success('Enquiry Submitted')
			} catch (e) {
				message.error('Error occurred while submitting enquiry')
				console.error(e)
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
		submitEnquiry: (data) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'contact',
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
