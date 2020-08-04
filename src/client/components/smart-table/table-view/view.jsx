import React from 'react'
import './styles.scss'
import { Table } from 'antd'
import classnames from 'classnames'

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { className } = this.props

	let props = {
		...this.props,
		className: classnames('table', className),
		columns: this.getColumns(),
	}
	return (
		<Table
			ref={(ref) => {
				this.tableRef = ref
			}}
			{...props}
			rowSelection={this.getRowSelection()}
		/>
	)
}
export default view
