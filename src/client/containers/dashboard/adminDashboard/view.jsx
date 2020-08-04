import React from 'react'
import './styles.scss'
import { Row, Col, Icon } from 'antd'
import Link from '../../../components/link'

var view = function () {
	const { dashboard } = this.props
	let { customer, users } = dashboard || {}
	const total = Object.keys(users || {}).reduce((sum, key) => {
		return sum + users[key]
	}, 0)
	const array = [
		{
			count: total,
			label: 'Users',
			route: 'home.users',
			icon: 'team',
		},
		{
			count: customer,
			label: 'Customers',
			route: 'home.customer',
			icon: 'solution',
		},
	]
	return (
		<div className="dashboard">
			<div className="content">
				<p className="page-title mobile-only">Dashboard</p>
				<Row gutter={16}>
					{array.map((item, index) => {
						const { count, label, route, jobStatus } = item
						return (
							<Col key={index} xs={24} sm={12} md={12} lg={6} xl={6}>
								<Link
									routeKey={route}
									{...(jobStatus && { queryParams: { jobStatus } })}
								>
									<div className="card">
										<div className="info">
											<div className="icon">
												<Icon type={item.icon} />
											</div>
											<div className="details">
												<p className="count">{count || 0}</p>
												<p className="label">{label}</p>
											</div>
										</div>
									</div>
								</Link>
							</Col>
						)
					})}
				</Row>
			</div>
		</div>
	)
}
export default view
