import React, { Component } from 'react'
import ComponentView from './view'
import PropTypes from 'prop-types'
import { Button, Modal, Tooltip, Icon } from 'antd'
import { getLocalizedLabel, isArrayEqual } from '../shared'
import classnames from 'classnames'

/**
 * @description Table View
 * @type Component
 */
export default class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		this.getLocalizedLabel = getLocalizedLabel.bind(this)
		this.initialize()
		this.clearSelection = this.clearSelection.bind(this)
	}

	/**
	 * Initialize the state with props
	 */
	initialize() {
		this.state = {
			rowSelection: false,
		}
	}

	/**
	 * Add Actions Column
	 */
	getColumns() {
		let { columns, actions, actionsWidth, shouldShowActions } = this.props
		const { rowSelection } = this.state
		actions = actions || []
		columns = [].concat(columns || [])
		//Disable Actions Column when rowSelection is done as batch actions will be enabled
		if (actions.length > 0 && !rowSelection) {
			columns.push({
				title: this.getLocalizedLabel('column.title'),
				dataIndex: 'actions',
				width: actionsWidth || 280,
				render: (text, record) => {
					const markup = (
						<div className="row-actions">
							{actions.map((action) => {
								return this.renderAction(action, text, record)
							})}
						</div>
					)
					if (shouldShowActions instanceof Function) {
						return shouldShowActions(text, record, markup)
					}
					return markup
				},
			})
		}
		return columns
	}

	/**
	 * shouldComponentUpdate hook
	 * @param nextProps
	 * @returns {boolean}
	 */
	shouldComponentUpdate(nextProps, nextState) {
		/**
		 * Here I think is we follow the immutability
		 * of data source somehow then we just need
		 * to compare references and not the full array objects
		 */
		// return !!!(isArrayEqual(nextProps.dataSource, this.props.dataSource) ||
		//     isArrayEqual(nextProps.columns, this.props.columns) ||
		//     isArrayEqual(nextProps.actions, this.props.actions));
		if (
			nextProps.loading !== this.props.loading ||
			this.state.rowSelection !== nextState.rowSelection ||
			!isArrayEqual(nextProps.dataSource, this.props.dataSource) ||
			!isArrayEqual(nextProps.columns, this.props.columns) ||
			!isArrayEqual(nextProps.actions, this.props.actions)
		) {
			return true
		}
		return false
	}

	/**
	 * Render Action
	 * @param action
	 * @returns {*}
	 */
	renderAction(action, text, record) {
		let actionName
		if (typeof action === 'string') {
			actionName = action
			action = {
				name: action,
			}
		} else {
			actionName = action.name || ''
		}
		switch (actionName.toLowerCase()) {
			case 'edit':
				return this.renderEditAction(action, text, record)
			case 'delete':
				return this.renderDeleteAction(action, text, record)
			default:
				return this.renderCustomAction(action, text, record)
		}
	}

	/**
	 * Render Edit Action
	 * @param action
	 * @param text
	 * @param record
	 * @returns {XML}
	 */
	renderEditAction(action, text, record) {
		let { buttonProps } = action
		buttonProps = buttonProps || {}
		return (
			<Button
				key="edit"
				{...buttonProps}
				className={classnames('edit', buttonProps.className)}
				onClick={this.onEdit.bind(this, record)}
			>
				{this.getLocalizedLabel('edit.button')}
			</Button>
		)
	}

	/**
	 * Render Delete Action
	 * @param action
	 * @param text
	 * @param record
	 * @returns {XML}
	 */
	renderDeleteAction(action, text, record) {
		let { buttonProps } = action
		buttonProps = buttonProps || {}

		return (
			<Tooltip key="delete" placement="top" title={'Delete'}>
				<Button
					{...buttonProps}
					className={classnames('delete', buttonProps.className)}
					onClick={this.onDelete.bind(this, record)}
				>
					<Icon type="delete" />
				</Button>
			</Tooltip>
		)
	}

	/**
	 * Render Custom Action
	 * @param action
	 * @param text
	 * @param record
	 * @returns {XML}
	 */
	renderCustomAction(action, text, record) {
		const { exposedConfig } = this.props
		if (action instanceof Function) {
			const CustomAction = action
			return (
				<CustomAction
					key={'action' + Math.random()}
					text={text}
					record={record}
					{...exposedConfig}
				/>
			)
		} else if (action && action instanceof Object) {
			const { buttonProps, label } = action
			return (
				<Button
					key={'action' + Math.random()}
					{...buttonProps}
					onClick={(event) => {
						if (
							buttonProps.onClick &&
							buttonProps.onClick instanceof Function
						) {
							buttonProps.onClick(event, record, text)
						}
					}}
				>
					{label || 'Button'}
				</Button>
			)
		} else {
			return null
		}
	}

	/**
	 * On Delete of record
	 * @param record
	 */
	onDelete(record) {
		Modal.confirm({
			title: this.getLocalizedLabel('delete.title'),
			content: this.getLocalizedLabel('delete.content'),
			okText: this.getLocalizedLabel('delete.okText'),
			okType: 'danger',
			cancelText: this.getLocalizedLabel('delete.cancelText'),
			onOk: async () => {
				const { onDelete } = this.props
				if (onDelete instanceof Function) {
					await onDelete(record)
				}
			},
			onCancel() {
				return
			},
		})
	}

	/**
	 * On Edit of record
	 * @param record
	 */
	onEdit(record) {
		const { onEdit } = this.props
		if (onEdit) {
			onEdit(record)
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	/**
	 * Get Row Selection
	 */
	getRowSelection() {
		const { selection } = this.props
		if (selection) {
			let config = {
				...selection,
			}
			config.onChange = this.onRowSelectionChange.bind(this)
			return config
		}
		return null
	}

	/**
	 * On Row Selection Change
	 * @param selectedRowKeys
	 * @param selectedRows
	 */
	onRowSelectionChange(selectedRowKeys, selectedRows) {
		const { onRowSelectionChange } = this.props
		if (selectedRowKeys.length > 0) {
			this.setState({
				rowSelection: true,
			})
		} else {
			this.setState({
				rowSelection: false,
			})
		}
		if (onRowSelectionChange instanceof Function) {
			onRowSelectionChange(selectedRowKeys, selectedRows)
		}
	}

	/**
	 * Clear Selection
	 */
	clearSelection() {
		if (this.tableRef.handleSelectRow) {
			this.tableRef.handleSelectRow('removeAll')
		}

		this.setState({
			rowSelection: false,
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

Main.displayName = 'Table-View'
Main.propTypes = {
	actions: PropTypes.array,
	dataSource: PropTypes.array,
	columns: PropTypes.array,
	onDelete: PropTypes.func,
	onEdit: PropTypes.func,
}
Main.defaultProps = {
	actions: [],
	dataSource: [],
	columns: [],
	onDelete: null,
	onEdit: null,
}
