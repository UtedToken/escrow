import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { Form, message } from 'antd'
import {
	getEmail,
	getSplittedName,
	getProfilePicture,
	uploadFilesBase64,
} from '../../../utils/firebase'
import { ActionNames, createAction } from 'app-redux/actions'

const spinningSelector = '.user-information'

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
		this.uploadProfilePicture = this.uploadProfilePicture.bind(this)
	}

	/**
	 * Sets Validations for fields
	 */
	setValidations() {
		const { translate, user } = this.props
		this.validations = {
			firstName: {
				rules: [
					{
						required: true,
						message: translate('common.firstName.error.required'),
					},
				],
				initialValue: user ? user.displayName : '',
			},
			photoURL: {
				initialValue: getProfilePicture({
					photoURL: user ? user.photoURL : '',
				}),
			},
		}
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

	/**
	 * On Submit of  Form
	 * @param event
	 */
	handleSubmit(event) {
		event.preventDefault()
		const { validateFieldsAndScroll } = this.props.form
		const { translate, updateUser } = this.props
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			window.startSpinning(spinningSelector)
			try {
				if (typeof values.photoURL !== 'string') {
					values.photoURL = await this.uploadProfilePicture(
						values.photoURL.dataUri,
					)
				}
				const { error, payload } = await updateUser(values)
				if (error) {
					throw payload.response.data
				}
				message.success(translate('common.changes.save.success'))
			} catch (e) {
				message.error(e.message)
			}
			window.stopSpinning(spinningSelector)
		})
	}

	/**
	 * uploadProfilePicture function uploads file
	 * @param base64
	 * @returns {Promise<*>}
	 */
	async uploadProfilePicture(base64) {
		const { uploadFile } = this.props
		try {
			const { error, payload } = await uploadFile({
				file: base64,
			})
			if (error) {
				throw payload.response
			}
			return payload.data.url
		} catch (e) {
			throw {
				message: 'Profile Picture did not Uploaded Successfully.',
			}
		}
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
		updateUser: (data) => {
			return dispatch(createAction(ActionNames.UPDATE_CURRENT_USER, data))
		},
		uploadFile: (data) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'storage',
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
	return {
		emitter: state.emitter,
		auth: state.firebase.auth,
		user: state.user,
	}
}
Main.displayName = 'Profile-Information-Form'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
