import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { Form, message } from 'antd'
import { getObjectsDiff } from '../../../utils/common'
import { PROFILE_IMAGES_PATH } from '../../../config'
import { getEmail, uploadImage } from 'utils/firebase'
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
						message: 'Enter Key',
					},
					{
						validator: (rule, value, callback) => {
							if (value.indexOf(' ') !== -1) {
								callback('Key does not contain space')
							} else {
								callback()
							}
						},
					},
				],
				initialValue: data ? data.key : null,
			},
			type: {
				rules: [
					{
						required: true,
						message: 'Select Type',
					},
				],
				...(data
					? {
							initialValue: data.type,
					  }
					: {}),
			},
			file: {
				rules: [
					{
						required: true,
						message: 'Upload File',
					},
				],
				initialValue: data ? data.value : null,
			},
			value: {
				rules: [
					{
						required: true,
						message: 'Enter Value',
					},
				],
				initialValue: data ? data.value : null,
			},
			description: {
				rules: [
					{
						required: true,
						message: 'Enter Description',
					},
				],
				initialValue: data ? data.description : null,
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
			const { file } = values
			window.startSpinning(spinningSelector)
			try {
				let action
				if (file && file.dataUri && file.type && file.name) {
					const { dataUri, type, name } = file
					action = await createStorage({
						file: dataUri,
						// type,
						// name
					})
					if (action.error) {
						throw action.payload.response
					}
					values.value = action.payload.data.url
				}
				delete values.file
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
					entityName: 'configuration',
					...data,
				}),
			)
		},
		updateRecord: ({ entityId, ...data }) => {
			const key = data.key
			delete data.key
			return dispatch(
				createAction(ActionNames.UPDATE_ENTITY, {
					entityName: 'configuration',
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
