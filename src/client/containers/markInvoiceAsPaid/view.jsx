import React from 'react'
import './styles.scss'
import { Button, Icon, Tooltip } from 'antd'

var view = function () {
	const { record } = this.props
	return record.paid || this.state.paid ? null : (
		<div className="resend-invoice">
			<Tooltip placement="top" title={'Mark As Paid'}>
				<Button onClick={this.markAsPaid} className="btn orange-btn-text">
					<Icon type="check" />
				</Button>
			</Tooltip>
		</div>
	)
}
export default view
