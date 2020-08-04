import React from 'react'
import './styles.scss'
import { Icon, Layout, Menu } from 'antd'
import MenuKeys from './config'

const { SubMenu, Item } = Menu
const { Sider } = Layout

var view = function () {
	const { role, drawer, routes } = this.props
	const { routeKey } = routes[routes.length - 1]
	let menus = MenuKeys.filter((item) => {
		if (item.role instanceof Function) {
			return item.role(role)
		}
		if (typeof item.role === 'undefined') {
			return true
		}
		return item.role === role
	})
	return (
		<Sider
			collapsible={true}
			collapsed={drawer}
			className="sider"
			collapsedWidth={0}
			breakpoint="md"
			width={250}
		>
			<Menu
				theme="light"
				mode="inline"
				ref={(ref) => {
					this.menuRef = ref
				}}
				onClick={this.handleMenuClick}
				selectedKeys={menus
					.filter((item) => {
						return item.key === routeKey
					})
					.map((item) => {
						return item.key
					})}
			>
				{menus.map((item, index) => {
					const { icon, name, children, key } = item

					if (children) {
						return (
							<SubMenu
								key={index}
								title={
									<span>
										<Icon type={icon} />
										<span>{name}</span>
									</span>
								}
							>
								{children.map((child, index) => {
									const { icon, name, key } = child
									return (
										<Item
											key={key}
											className={
												routeKey === key ? 'ant-menu-item-selected' : {}
											}
										>
											<Icon type={icon} />
											<span>{name}</span>
										</Item>
									)
								})}
							</SubMenu>
						)
					} else {
						return (
							<Item
								key={key}
								//className={(routeKey === key) ? 'ant-menu-item-selected' : ""}
							>
								<Icon type={icon} />
								<span>{name}</span>
							</Item>
						)
					}
				})}
			</Menu>
		</Sider>
	)
}
export default view
