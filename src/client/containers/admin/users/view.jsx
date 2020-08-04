import React from 'react'
import './styles.scss'
import { Button, Icon } from 'antd'

import SmartTable from 'core-components/smart-table'
import { ModalTrigger } from 'core-components/modal'

/**
 * View
 * @returns {XML}
 */
var view = function () {
	const { auth } = this.props
	const columns = this.columns

	const addUser = (props) => {
		return (
			<ModalTrigger
				modalId="userForm"
				modalProps={{
					title: 'Create User',
					className: 'add-user-modal',
					footer: null,
				}}
			>
				<Button className="add">
					<span className="icon">
						<Icon type="plus" theme="outlined" />
					</span>
					<span className="text">Create User</span>
				</Button>
			</ModalTrigger>
		)
	}
	const editUser = (props) => {
		return (
			<ModalTrigger
				modalId="userForm"
				modalProps={{
					title: 'Create User',
					className: 'add-user-modal',
					footer: null,
					contentProps: {
						data: props.record.data,
					},
				}}
			>
				<Button className="edit">Edit</Button>
			</ModalTrigger>
		)
	}
	const sendNotification = (props) => {
		let keys = []
		if (props.record) {
			keys.push(props.record.key)
		} else if (props.selection) {
			keys = [...props.selection.keys]
		} else {
			keys = []
		}
		return (
			<ModalTrigger
				modalId="notificationModal"
				modalProps={{
					title: 'Send Notification',
					className: 'notification-modal',
					footer: null,
					contentProps: { data: { keys } },
				}}
			>
				<Button className="notification-btn">
					<span className="icon">
						<Icon type="notification" theme="outlined" />
					</span>
					<span className="text">Send Notification</span>
				</Button>
			</ModalTrigger>
		)
	}

	return (
		<div className="data">
			<div className="content">
				{auth ? (
					<SmartTable
						listConfig={{
							bordered: true,
							dataSource: this.getTableData(),
							columns,
							actions: [editUser, 'delete', sendNotification],
							onDelete: (record) => {
								return this.deleteRecord(record.key)
							},
							selection: {},
						}}
						paginationType="client"
						getData={this.getUsers.bind(this)}
						headerConfig={{
							actions: [addUser],
							batchActions: [sendNotification, 'delete'],
							onDeleteSelected: ({ keys }) => {
								return this.deleteRecord(keys.join(','))
							},
						}}
						entity="Build Configuration"
					/>
				) : null}
			</div>
		</div>
	)
}
export default view
