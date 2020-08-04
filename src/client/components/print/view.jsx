import React from 'react'
import { Button, Icon, Tooltip } from 'antd'
import { ModalTrigger } from '../modal'
//import './styles.scss';
/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const { data } = this.props

	return (
		<Tooltip placement="top" title={'Print PDF'}>
			<Button onClick={this.print} className="btn blue-btn-text">
				<Icon type="printer" />
			</Button>
		</Tooltip>
	)
}
export default view
