import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { Form, message } from 'antd'
import { getObjectsDiff } from '../../../utils/common'
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
		const { data } = this.props
		this.validations = {
			corporateNumber: {
				rules: [
					{
						required: true,
						message: 'Enter EW/Customer/Corporate Number',
					},
				],
				initialValue: data ? data.corporateNumber : null,
			},
			customerName: {
				rules: [
					{
						required: true,
						message: 'Enter Customer Name',
					},
				],
				initialValue: data ? data.customerName : null,
			},
			address: {
				rules: [
					{
						required: true,
						message: 'Enter Address',
					},
				],
				initialValue: data ? data.address : null,
			},
			homeNumber: {
				rules: [
					{
						min: 9,
						max: 15,
						message: 'Mobile Number must be at between 9 digits and 15 digits',
					},
				],
				initialValue: data ? data.homeNumber : null,
			},
			key: {
				rules: [
					{
						required: true,
						message: 'Enter Mobile Number',
					},
					{
						min: 9,
						max: 15,
						message: 'Mobile Number must be at least 9 digits long',
					},
					{
						validator: (rule, value, callback) => {
							if (value && isNaN(value.replace('+', ''))) {
								callback('Number must not contain any alphabet')
							} else {
								callback()
							}
						},
					},
				],
				initialValue: data ? data.key : null,
			},
			officeNumber: {
				rules: [
					{
						min: 9,
						max: 15,
						message: 'Mobile Number must be at least 9 digits long',
					},
				],
				initialValue: data ? data.officeNumber : null,
			},
			email: {
				rules: [{ type: 'email', message: 'Enter Valid Email' }],
				initialValue: data ? data.email : null,
			},
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	async componentDidMount() {}

	handleSubmit(event) {
		event.preventDefault()
		const { validateFieldsAndScroll } = this.props.form
		const {
			getTableData,
			hideModal,
			createRecord,
			updateRecord,
			data,
		} = this.props
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			window.startSpinning(spinningSelector)
			try {
				if (data) {
					const { error, payload } = await updateRecord({
						entityId: data.key,
						...getObjectsDiff(values, data),
					})
					if (error) {
						throw payload.response
					}
				} else {
					const { error, payload } = await createRecord(values)
					if (error) {
						throw payload.response
					}
				}
				if (hideModal instanceof Function) {
					hideModal()
				}
				if (getTableData instanceof Function) {
					getTableData()
				}
			} catch (e) {
				console.log(e)
				if (e && e.status === 404) {
					message.error('Customer Already Exists with this phone number')
				} else {
					message.error('Error while saving Customer')
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
		createRecord: (data) => {
			const action = createAction(ActionNames.CREATE_ENTITY, {
				entityName: 'customer',
				...data,
			})
			action.type = action.type + '_customer'
			return dispatch(action)
		},
		updateRecord: ({ entityId, ...data }) => {
			const action = createAction(ActionNames.UPDATE_ENTITY, {
				entityName: 'customer',
				entityId,
				...data,
			})
			action.type = action.type + '_customer'
			return dispatch(action)
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
	const { roles } = users || {}
	return {
		roles,
	}
}
Main.displayName = 'User-Form'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
