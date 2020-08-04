import React from 'react'
import './styles.scss'
import { Col, Icon, Row } from 'antd'
import { getAllISOCodes } from 'iso-country-currency'
import { nFormatter } from '../../utils/common'
var view = function () {
	const { dashboard, CURRENCY } = this.props
	const { symbol } =
		getAllISOCodes().find((item) => {
			return item.currency === CURRENCY
		}) || {}
	const { sales } = dashboard || {}
	const { unpaid, paid } = sales || {}
	const month = new Date().getMonth() + 1
	const year = new Date().getFullYear()
	const monthlyPaidSales = {
		count: 0,
		amount: 0,
	}
	const monthlyUnpaidSales = {
		count: 0,
		amount: 0,
	}
	const yearlyPaidSales = {
		count: 0,
		amount: 0,
	}
	const yearlyUnpaidSales = {
		count: 0,
		amount: 0,
	}
	try {
		Object.keys(unpaid[year]).forEach((key) => {
			const { cost, count } = unpaid[year][key]
			yearlyUnpaidSales.count = yearlyUnpaidSales.count + count
			yearlyUnpaidSales.amount = yearlyUnpaidSales.amount + cost
		})
		monthlyUnpaidSales.amount = unpaid[year][month].cost
		monthlyUnpaidSales.count = unpaid[year][month].count
		Object.keys(paid[year]).forEach((key) => {
			const { cost, count } = paid[year][key]
			yearlyPaidSales.count = yearlyPaidSales.count + count
			yearlyPaidSales.amount = yearlyPaidSales.amount + cost
		})
		monthlyPaidSales.amount = paid[year][month].cost
		monthlyPaidSales.count = paid[year][month].count
	} catch (e) {}
	const array = [
		{
			icon: 'calendar',
			label: 'Unpaid Invoices of this month',
			...monthlyUnpaidSales,
		},
		{
			icon: 'calendar',
			label: 'Paid Invoices of this month',
			...monthlyPaidSales,
		},
		{
			icon: 'bar-chart',
			label: 'Unpaid Invoices of this year',
			...yearlyUnpaidSales,
		},
		{
			icon: 'bar-chart',
			label: 'Paid Invoices of this year',
			...yearlyPaidSales,
		},
	]
	return (
		<div className="invoice-header">
			<Row gutter={16}>
				{array.map((item, index) => {
					const { icon, label, count, amount } = item
					return (
						<Col key={index} xs={24} sm={12} md={12} lg={12} xl={6}>
							<div className="card">
								<div className="info">
									<div className="icon">
										<Icon type={icon} />
									</div>
									<div className="details">
										<p className="count">{symbol + nFormatter(amount)}</p>
										<p className="label">
											{count ? count : ''} {label}
										</p>
									</div>
								</div>
							</div>
						</Col>
					)
				})}
			</Row>
		</div>
	)
}
export default view
