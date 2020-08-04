import React, { Component } from 'react'
import ComponentView from './view'
import { Button, Modal } from 'antd'
import { getLocalizedLabel } from '../shared'
import classnames from 'classnames'

/**
 * @description Sample Component
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
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	/**
	 * Render Action
	 * @param action
	 * @returns {*}
	 */
	renderActions() {
		let { actions } = this.props
		actions = actions || []
		return actions.map((action) => {
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
				case 'add':
					return this.renderAddAction(action)
				default:
					return this.renderCustomAction(action)
			}
		})
	}

	/**
	 * Render Batch Actions
	 * @param action
	 * @returns {*}
	 */
	renderBatchActions() {
		let { batchActions } = this.props
		let actions = batchActions || []
		return actions.map((action) => {
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
				case 'delete':
					return this.renderBatchDeleteAction(action)
				default:
					return this.renderBatchCustomAction(action)
			}
		})
	}

	/**
	 * Render Add Action
	 * @param action
	 */
	renderAddAction(action) {
		const { entity } = this.props
		let { buttonProps } = action
		buttonProps = buttonProps || {}
		return (
			<Button
				key="add"
				{...buttonProps}
				className={classnames('add', buttonProps.className)}
				onClick={this.onAdd.bind(this)}
			>
				{this.getLocalizedLabel('add.button', entity)}
			</Button>
		)
	}

	/**
	 * On Add of record
	 * @param record
	 */
	onAdd(record) {
		const { onAdd } = this.props
		if (onAdd) {
			onAdd(record)
		}
	}

	/**
	 * Render Add Action
	 * @param action
	 */
	renderCustomAction(Action) {
		const { exposedConfig } = this.props
		if (Action instanceof Function) {
			return <Action key={'action' + Math.random()} {...exposedConfig} />
		} else if (Action && Action instanceof Object) {
			const { buttonProps, label } = Action
			return (
				<Button
					key={'action' + Math.random()}
					{...buttonProps}
					onClick={(event) => {
						if (
							buttonProps.onClick &&
							buttonProps.onClick instanceof Function
						) {
							return buttonProps.onClick(event)
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
	 * Render Batch Delete Actions
	 * @param action
	 */
	renderBatchDeleteAction(action) {
		let { buttonProps } = action
		buttonProps = buttonProps || {}

		return (
			<Button
				key="delete"
				{...buttonProps}
				className={classnames('delete-selected', buttonProps.className)}
				onClick={this.onDelete.bind(this)}
			>
				{this.getLocalizedLabel('delete.selected.button')}
			</Button>
		)
	}

	/**
	 * On Delete of record
	 * @param record
	 */
	onDelete() {
		const { selection } = this.props
		Modal.confirm({
			title: this.getLocalizedLabel('delete.selected.title'),
			content: this.getLocalizedLabel('delete.selected.content'),
			okText: this.getLocalizedLabel('delete.okText'),
			okType: 'danger',
			cancelText: this.getLocalizedLabel('delete.cancelText'),
			onOk: () => {
				const { onDeleteSelected } = this.props
				if (onDeleteSelected instanceof Function) {
					onDeleteSelected(selection)
				}
			},
			onCancel() {
				return
			},
		})
	}

	/**
	 * Render custom batch Action
	 * @param action
	 */
	renderBatchCustomAction(Action) {
		const { exposedConfig, selection } = this.props
		if (Action instanceof Function) {
			return (
				<Action
					key={'action' + Math.random()}
					{...exposedConfig}
					selection={selection}
				/>
			)
		} else if (Action && Action instanceof Object) {
			const { buttonProps, label } = Action
			return (
				<Button
					key={'action' + Math.random()}
					{...buttonProps}
					onClick={(event) => {
						if (
							buttonProps.onClick &&
							buttonProps.onClick instanceof Function
						) {
							return buttonProps.onClick(event, selection)
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
	 * Render Method
	 * @returns {*}
	 */
	render() {
		return ComponentView.bind(this)()
	}
}

Main.displayName = 'Header-Bar'
