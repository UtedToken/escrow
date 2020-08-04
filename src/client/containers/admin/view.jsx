import React from 'react'
import './styles.scss'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import Users from './users'
import Sider from '../sider'

const { Content } = Layout

/**
 * Returns the JSX Markup for the view
 * @returns {XML}
 */
var view = function () {
	const currentRoute = this.getCurrentRoute()
	return (
		<div className="admin">
			<Layout style={{ minHeight: '100vh' }}>
				<Sider />
				<Layout>
					<Content style={{ margin: '0 16px' }}>
						<p className="placeholder">Admin</p>
					</Content>
				</Layout>
			</Layout>
		</div>
	)
}
export default view
