import React from 'react'
import './styles.scss'
import { Layout, Icon, Button, Form, Input } from 'antd'
import Link from 'core-components/link'
import logo from '../../../images/logo.png'

const FormItem = Form.Item
const { Header } = Layout
var view = function () {
	const { scrolled } = this.state
	const { form, WEBSITELOGO } = this.props
	const { getFieldDecorator } = form
	const route = this.getCurrentRoute()
	const { number } = this.validations
	return (
		<Header
			className={
				'public-header fixed ' +
				(scrolled ? 'scrolled animated slideInDown ' : '') +
				(route.routeKey === 'landing' ? 'landing' : '')
			}
		>
			<div className="bottom-section">
				<div className="container">
					<div className="content">
						<div className="left">
							<div className="logo-container">
								<Link routeKey="login" className="logo">
									{WEBSITELOGO && <img src={WEBSITELOGO} alt={'logo'} />}
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Header>
	)
}
export default view
