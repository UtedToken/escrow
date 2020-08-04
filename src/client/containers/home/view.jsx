import React from 'react'
import './styles.scss'
import { Layout } from 'antd'
import Sider from '../sider'
import Link from '../../components/link'

var view = function () {
	const { children, horizontalMenu, routes, drawer } = this.props
	const { smallScreens } = this.state
	console.log(smallScreens)
	return (
		<div className="home">
			{!drawer && smallScreens ? (
				<Link className="overlay" onClick={this.closeDrawer.bind(this)} />
			) : null}
			<Layout style={{ minHeight: '100vh' }}>
				{!horizontalMenu ? <Sider routes={routes} /> : null}
				<Layout className="home-layout">{children}</Layout>
			</Layout>
		</div>
	)
}
export default view
