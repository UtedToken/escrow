import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from 'containers/preprocess'
import { message, Modal } from 'antd'
import { ActionNames, createAction } from 'app-redux/actions'

/**
 * @description Delete Entity Container
 * @type Container
 */
class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
	}

	async deleteEntity() {
		const {
			entityName,
			entityId,
			deleteEntity,
			onSuccess,
			onError,
			message,
		} = this.props
		Modal.confirm({
			title: 'Are you sure?',
			content: message || 'This will permanently delete it from the system',
			okType: 'danger',
			onOk: async () => {
				try {
					const action = await deleteEntity({ entityName, entityId })
					if (action.error) {
						throw action
					}
					if (onSuccess instanceof Function) {
						onSuccess(action.payload.data)
					}
				} catch (e) {
					console.log(e)
					if (onError instanceof Function) {
						onError(e.payload)
					}
					message.error('Error while processing your request')
				}
			},
			onCancel() {
				return
			},
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
		deleteEntity: ({ entityName, entityId }) => {
			const action = createAction(ActionNames.DELETE_ENTITY, {
				entityName,
				entityId,
			})
			action.type = action.type + '_accounts'
			return dispatch(action)
		},
	}
}
/**
 * Bind State to props
 * @returns {{Object}}
 */
const mapStateToProps = ({}) => {
	return {}
}
Main.displayName = 'Add-Days'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
})
