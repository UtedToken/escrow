import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { createAction, ActionNames } from '../../../redux/actions'
import { Form, message } from 'antd'
import { JSONToCSVConvertor } from '../../../utils/common'

const spinningSelector = '.main-container'

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
		this.columns = [
			{
				title: 'Name',
				dataIndex: 'name',
			},
			{
				title: 'Login Provider',
				dataIndex: 'provider',
			},
			{
				title: 'Login Credential',
				dataIndex: 'providerData',
			},
		]

		this.state = {}
	}

	/**
	 * Component Did Mount
	 */
	componentDidMount() {}

	getUsers() {
		const { getUsers, translate } = this.props
		window.startSpinning(spinningSelector)
		getUsers({
			count: 100,
		})
			.then(() => {
				window.stopSpinning(spinningSelector)
			})
			.catch((e) => {
				message.error(translate('common.changes.get.error'))
			})
	}

	/**
	 * componentWillReceiveProps Hook
	 */
	componentWillReceiveProps(newProps) {}

	/**
	 * Should Component Update
	 * @param newProps
	 * @param newState
	 */
	shouldComponentUpdate(newProps, newState) {
		return newProps.auth !== this.props.auth || newProps.data !== this.props.data
	}

	/**
	 * Download as CSV
	 */
	downloadAsCsv() {
		const { dataSource } = this.state
		JSONToCSVConvertor(
			dataSource.map((item) => {
				return {
					Name: item.name,
					'Login Provider': item.provider,
					'Provider Credential': item.providerData,
				}
			}),
			'Users',
			true,
		)
	}

	/**
	 * Get Table Data
	 * @param data
	 * @returns {Array}
	 */
	getTableData() {
		let { data } = this.props
		let dataSource = []
		data.map((item) => {
			let providerData = item.providerData[0]
			if (providerData) {
				dataSource.push({
					key: item.uid,
					name: item.displayName || providerData.displayName,
					provider: providerData.providerId,
					providerData: providerData.email || providerData.uid,
					data: item,
				})
			}
		})
		return dataSource
	}

	/**
	 * Delete Record - Pass multiple keys comma separated
	 * @param keys
	 * @returns {Promise.<*>}
	 */
	async deleteRecord(keys) {
		const { deleteUser } = this.props
		return await deleteUser(keys)
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
		getUsers: (data) => {
			return dispatch(
				createAction(ActionNames.GET_ENTITIES, {
					adminAccess: true,
					entityName: 'users',
					data,
				}),
			)
		},
		sendNotifications: (data) => {
			return dispatch(createAction(ActionNames.SEND_NOTIFICATIONS, data))
		},
		deleteUser: (id) => {
			return dispatch(
				createAction(ActionNames.DELETE_ENTITY, {
					adminAccess: true,
					entityName: 'users',
					entityId: id,
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
const mapStateToProps = ({ users, firebase }) => {
	return {
		auth: firebase.auth,
		data: users.users,
	}
}
Main.displayName = 'Users'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
