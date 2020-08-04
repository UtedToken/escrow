import React from 'react'
import './styles.scss'
import TableView from './table-view'
import HeaderBar from './header-bar'
import classnames from 'classnames'

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	let {
		listConfig,
		headerConfig,
		entity,
		header,
		title,
		displayType,
		className,
		entityName,
	} = this.props
	const { dataSource, loading, selection } = this.state
	const paginationType = this.getPaginationType()

	/**
	 * Duplicate List Config
	 * @type {{}}
	 */
	listConfig = {
		...listConfig,
	}
	headerConfig = {
		...headerConfig,
	}
	if (headerConfig.search !== false) {
		headerConfig.search = {
			onChange: this.onSearchChange,
			// onKeyUp: e => {
			//     this.onSearchChange.apply(this, [e.target.value])
			// },
			...headerConfig.search,
		}
	}

	/**
	 * If Pagination is server handle page change
	 */
	if (paginationType === 'server') {
		listConfig.onChange = this.onPageChange.bind(this)
	} else {
		//Delete any passed onChange if pagination type is not server, Let antd provide client side pagination
		delete listConfig.onChange
	}
	listConfig.onDelete = this.getOnDelete()
	headerConfig.onDeleteSelected = this.getOnDeleteSelected()
	return (
		<div
			className={classnames('smart-table', className, entityName, {
				card: displayType === 'card',
			})}
		>
			{!!header ? (
				header
			) : header === false ? null : (
				<HeaderBar
					{...headerConfig}
					selection={selection}
					title={title}
					exposedConfig={this.getExposedConfig()}
					entity={entity}
				/>
			)}

			<TableView
				ref={(ref) => {
					this.tableViewRef = ref
				}}
				{...listConfig}
				loading={loading || listConfig.loading}
				dataSource={dataSource}
				entity={entity}
				exposedConfig={this.getExposedConfig()}
				onRowSelectionChange={this.onRowSelectionChange.bind(this)}
			/>
		</div>
	)
}
export default view
