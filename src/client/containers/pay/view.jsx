import React from 'react'
import './styles.scss'
import { Icon, Button } from 'antd'
import PaymentGateways from '../../components/payment-gateways'
import { getAllISOCodes } from 'iso-country-currency'

var view = function () {
	const { total, payment, jobNumber, invoiceId } = this.state
	const { key, method } = payment || {}
	const { gateway, CURRENCY, WEBSITELOGO } = this.props
	const { symbol } =
		getAllISOCodes().find((item) => {
			return item.currency === CURRENCY
		}) || {}
	return (
		<div className="payment">
			{!!payment ? (
				<div className="status done">
					<div className="response">
						<Icon type="check-circle" />
						<p>Paid</p>
					</div>
					<div className="details">
						<p>
							<span className="label">Amount Paid: </span>
							<span className="value">
								{symbol} {total}
							</span>
						</p>
						<p>
							<span className="label">Payment Method: </span>
							<span className="value">{method ? method : 'Cash'}</span>
						</p>
						<p>
							<span className="label">Job Number: </span>
							<span className="value">{jobNumber}</span>
						</p>
						<p>
							<span className="label">Invoice Id: </span>
							<span className="value">{invoiceId}</span>
						</p>
					</div>
				</div>
			) : invoiceId ? (
				<div className="status pending">
					<div className="amount">
						<p>
							Total Amount : - {symbol} {total}
						</p>
					</div>
					{total && (
						<PaymentGateways
							gateway={(gateway || []).map((item) => ({
								...item,
								additionalData: {
									amount: total,
									CURRENCY,
									WEBSITELOGO,
								},
							}))}
							onSuccess={this.onPayment}
						/>
					)}
				</div>
			) : null}
		</div>
	)
}
export default view
