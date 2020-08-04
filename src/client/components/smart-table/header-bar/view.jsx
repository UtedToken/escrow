import React from 'react'
import './styles.scss'
import Search from './search'

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { search, entity, title, selection } = this.props
	return (
		<div className="smart-table-header">
			<div className="data-header">
				{title ? (
					<span className="title">
						{title ||
							(entity ? entity + 's' : this.getLocalizedLabel('header.title'))}
					</span>
				) : null}

				<div className="actions">
					{selection ? this.renderBatchActions() : this.renderActions()}
				</div>
			</div>
			{search === false ? null : <Search {...search} />}
		</div>
	)
}
export default view
