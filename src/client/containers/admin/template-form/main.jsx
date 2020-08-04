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
		this.state = {
			data: [],
		}
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
			subject: {
				rules: [
					{
						required: true,
						message: 'Subject is required',
					},
				],
				initialValue: data ? data.subject : null,
			},
			from: {
				rules: [
					{
						required: true,
						message: 'From Email is required',
					},
				],
				initialValue: data ? data.from : null,
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
			pdfTemplate: {
				initialValue: data ? data.pdfTemplate : null,
			},
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	async componentDidMount() {
		const { getRecords } = this.props
		try {
			const { error, payload } = await getRecords()
			if (error) {
				throw payload.response
			}
			const { data } = payload
			this.setState({ data })
		} catch (e) {
			console.log(e)
		}
	}

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
		getRecords: () => {
			return dispatch(
				createAction(
					ActionNames.GET_ENTITIES,
					{
						entityName: 'pdf-template',
						all: true,
					},
					true,
				),
			)
		},
		createRecord: (data) => {
			const action = createAction(ActionNames.CREATE_ENTITY, {
				entityName: 'email-template',
				...data,
			})
			action.type = action.type + '_email-template'
			return dispatch(action)
		},
		updateRecord: ({ entityId, ...data }) => {
			const action = createAction(ActionNames.UPDATE_ENTITY, {
				entityName: 'email-template',
				entityId,
				...data,
			})
			action.type = action.type + '_email-template'
			return dispatch(action)
		},
	}
}
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = ({ config, ...state }) => {
	const { data } = state['pdf-template'] || {}
	const { users } = config
	const { roles } = users || {}
	return {
		roles,
		templates: data,
	}
}
Main.displayName = 'User-Form'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
