import React from 'react'
import './styles.scss'
import SmartTable from 'core-components/smart-table'
import { ModalTrigger } from 'core-components/modal'
import { Button, Icon, Tooltip } from 'antd'

var view = function () {
	const {
		entityName,
		columns,
		search,
		data,
		selection,
		total,
		formId,
		children,
		formProps,
		editAction,
		addAction,
		routes,
		deleteAction,
		shouldShowActions,
	} = this.props
	let { pagination } = this.props
	pagination = pagination || {
		type: 'client',
	}
	const addRecord = (props) => {
		return formId ? (
			<ModalTrigger
				modalId={formId}
				modalProps={{
					title: 'Create',
					className: 'add-record-modal ' + formId,
					footer: null,
					contentProps: {
						...formProps,
						getTableData: () => {
							this.getTableData(this.currentPagination)
						},
					},
				}}
			>
				<Button className="add">
					<span className="icon">
						<Icon type="plus" theme="outlined" />
					</span>
					<span className="text">Create</span>
				</Button>
			</ModalTrigger>
		) : null
	}
	const editRecord = (props) => {
		return (
			<ModalTrigger
				modalId={formId}
				modalProps={{
					title: 'Edit',
					className: 'add-record-modal ' + formId,
					footer: null,
					contentProps: {
						data: props.record,
						...formProps,
						getTableData: () => {
							this.getTableData(this.currentPagination)
						},
					},
				}}
			>
				<Tooltip placement="top" title={'Edit'}>
					<Button className="edit">
						<Icon type="edit" />
					</Button>
				</Tooltip>
			</ModalTrigger>
		)
	}
	let batchActions = []
	let rowActions = []
	let headerActions = []
	if (editAction !== false && typeof formId === 'string') {
		rowActions.push(editRecord)
	}
	if (deleteAction !== false) {
		rowActions.push('delete')
		batchActions.push('delete')
	}
	if (addAction !== false && typeof formId === 'string') {
		headerActions.push(addRecord)
	}

	rowActions = rowActions.concat(
		(this.props.rowActions || []).map((Action) => {
			return (props2) => (
				<Action {...props2} getTableData={this.getTableData.bind(this)} />
			)
		}),
	)
	headerActions = headerActions.concat(this.props.headerActions || [])
	let tableColumns = []
	if (columns instanceof Function) {
		tableColumns = columns({
			sharedState: this.props,
		})
	} else {
		tableColumns = columns
	}
	let searchProps = {}
	if (search instanceof Function) {
		searchProps = search(this.props)
	} else {
		searchProps = search
	}
	return children ? (
		children
	) : (
		<div className="smart-table">
			<SmartTable
				listConfig={{
					bordered: true,
					dataSource: data,
					columns: tableColumns,
					actions: rowActions,
					onDelete: (record) => {
						return this.deleteRecord(record.key)
					},
					selection: selection === false ? undefined : { ...selection },
					pagination:
						pagination && pagination.type === 'server'
							? {
									total,
									pageSize: pagination.pageSize || this.pageSize,
							  }
							: undefined,
					rowKey: 'key',
					shouldShowActions:
						shouldShowActions instanceof Function
							? shouldShowActions({
									sharedState: this.props,
							  })
							: null,
				}}
				entityName={entityName}
				//displayType = {displayType}
				paginationType={pagination.type}
				getData={this.getTableData.bind(this)}
				headerConfig={{
					actions: headerActions,
					batchActions,
					onDeleteSelected: ({ keys }) => {
						return this.deleteRecord(keys.join(','))
					},
					search: searchProps,
				}}
				title={entityName}
			/>
		</div>
	)
}
export default view
