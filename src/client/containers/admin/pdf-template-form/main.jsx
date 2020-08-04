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
			key: {
				rules: [
					{
						required: true,
						message: 'Code is Required',
					},
				],
				initialValue: data ? data.key : null,
			},
			name: {
				rules: [
					{
						required: true,
						message: 'Name is required',
					},
				],
				initialValue: data ? data.name : null,
			},
			templateVariables: {
				rules: [],
				initialValue: data
					? data.templateVariables
					: 'Variable name : Variable Value',
			},
			template: {
				rules: [
					{
						required: true,
						message: 'Template is Required',
					},
				],
				initialValue: data ? data.template : null,
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
				if (e.status === 404) {
					message.error('Template Already Exists')
				} else {
					message.error('Error while saving the template')
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
				entityName: 'pdf-template',
				...data,
			})
			action.type = action.type + '_pdf-template'
			return dispatch(action)
		},
		updateRecord: ({ entityId, ...data }) => {
			const action = createAction(ActionNames.UPDATE_ENTITY, {
				entityName: 'pdf-template',
				entityId,
				...data,
			})
			action.type = action.type + '_pdf-template'
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
