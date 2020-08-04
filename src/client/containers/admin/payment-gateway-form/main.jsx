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
						message: 'Gateway ID is required',
					},
				],
				initialValue: data ? data.key : null,
			},
			apiKey: {
				initialValue: data ? data.apiKey : null,
			},
			apiSecret: {
				initialValue: data ? data.apiSecret : null,
			},
			logo: {
				initialValue: data ? data.logo : null,
			},
			additionalData: {
				initialValue: data ? data.additionalData : null,
			},
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	handleSubmit(event) {
		event.preventDefault()
		const {
			form,
			translate,
			createRecord,
			hideModal,
			createStorage,
			updateRecord,
			data,
			getTableData,
		} = this.props
		const { validateFieldsAndScroll } = form
		validateFieldsAndScroll(async (errors, values) => {
			if (errors) {
				return
			}
			const { logo } = values
			window.startSpinning(spinningSelector)
			try {
				let action
				if (logo && logo.dataUri && logo.type && logo.name) {
					const { dataUri, type, name } = logo
					action = await createStorage({
						file: dataUri,
						type,
						name,
					})
					if (action.error) {
						throw action.payload.response
					}
					values.logo = action.payload.data.url
				}
				if (data) {
					let updatedValues = getObjectsDiff(values, data)
					action = await updateRecord({
						...updatedValues,
						key: data.key,
					})
				} else {
					values.key = values.key.toUpperCase()
					action = await createRecord(values)
				}
				if (!action.error) {
					message.success(translate('common.changes.save.success'))
					hideModal()
				} else {
					throw action.payload.response
				}
				if (getTableData instanceof Function) {
					getTableData()
				}
			} catch (e) {
				if (e.status === 404) {
					message.error('Record Already Exist')
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
		createRecord: (data) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'gateway',
					...data,
				}),
			)
		},
		updateRecord: ({ entityId, ...data }) => {
			const key = data.key
			delete data.key
			return dispatch(
				createAction(ActionNames.UPDATE_ENTITY, {
					entityName: 'gateway',
					entityId: key,
					...data,
				}),
			)
		},
		createStorage: ({ file, type, name }) => {
			return dispatch(
				createAction(ActionNames.CREATE_ENTITY, {
					entityName: 'storage',
					file,
					type,
					name,
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
	return {}
}
Main.displayName = 'User-Form'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
