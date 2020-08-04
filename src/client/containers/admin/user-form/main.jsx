import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { Form, message } from 'antd'
import { getObjectsDiff } from '../../../utils/common'
import { getEmail } from 'utils/firebase'
import { createAction, ActionNames } from '../../../redux/actions'

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
		const { translate, data } = this.props
		this.validations = {
			name: {
				rules: [
					{
						required: true,
						message: translate('common.firstName.error.required'),
					},
				],
				initialValue: data ? data.displayName : null,
			},
			email: {
				rules: [
					{
						required: !data && true,
						message: translate('common.email.error.required'),
					},
					{ type: 'email', message: translate('common.email.error.invalid') },
				],
				initialValue: data ? getEmail(data) : null,
			},
			password: {
				rules: [
					{
						required: !data && true,
						message: translate('common.password.error.required'),
					},
					{
						min: 6,
						message: 'The password must be at least 6 characters long',
					},
				],
			},
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	async componentDidMount() {
		// const {getRoles} = this.props;
		// await getRoles();
	}

	handleSubmit(event) {
		event.preventDefault()
		const { validateFieldsAndScroll } = this.props.form
		const {
			translate,
			createUser,
			getTableData,
			hideModal,
			updateUser,
			data,
		} = this.props
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			/**
			 * If no external provider is used, email or phone is mandatory
			 */
			if (
				data &&
				!data.phoneNumber &&
				!data.email &&
				data.providerData.length === 0
			) {
				message.error(translate('common.phoneOrEmail.error.required'))
				return
			}
			window.startSpinning(spinningSelector)
			try {
				let action
				if (data) {
					let updatedValues = getObjectsDiff(values, data)
					action = await updateUser({
						...updatedValues,
						uid: data.uid,
					})
				} else {
					action = await createUser(values)
				}
				//Update profile

				if (!action.error) {
					message.success(translate('common.changes.save.success'))
					hideModal()
				} else {
					throw action.payload.response
				}
				if (getTableData instanceof Function) {
					getTableData()
				}
			} catch (err) {
				if (err.status === 409) {
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
					entityName: 'users',
					...data,
				}),
			)
		},
		updateUser: (data) => {
			const entityId = data.uid
			delete data.uid
			return dispatch(
				createAction(ActionNames.UPDATE_ENTITY, {
					entityName: 'users',
					entityId,
					...data,
				}),
			)
		},
		getRoles: () => {
			const action = createAction(ActionNames.GET_ENTITIES, {
				entityName: 'roles',
			})
			action.type = action.type + '_roles'
			return dispatch(action)
		},
		createStorage: (file) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'storage',
					file,
					type: 'image',
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
const mapStateToProps = ({ config }) => {
	const { users } = config
	const { roles, prefixes } = users || {}
	return {
		roles,
		prefixes,
	}
}
Main.displayName = 'User-Form'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
