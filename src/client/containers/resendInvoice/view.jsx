import React from 'react'
import './styles.scss'
import { Button, Icon, Tooltip } from 'antd'

var view = function () {
	return (
		<div className="resend-invoice">
			<Tooltip placement="top" title={'Resend Invoice'}>
				<Button onClick={this.resendInvoice} className="btn orange-btn-text">
					<Icon type="transaction" />
				</Button>
			</Tooltip>
		</div>
	)
}
export default view
