import React from 'react'
import { Row, Col, Card, Button, Icon } from 'antd'
import Link from '../../../components/link'
import './styles.scss'

var view = function () {
	const { dashboard } = this.props
	let { service } = dashboard || {}
	service = service || {}

	return (
		<div className="dashboard">
			<div className="content">
				<p className="page-title">Dashboard</p>
				<Row gutter={16}></Row>
			</div>
		</div>
	)
}
export default view
