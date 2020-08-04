import React from 'react'
import './styles.scss'
import { Layout, Icon, Avatar, Popover, Menu } from 'antd'
import Link from 'core-components/link'
import { getProfilePicture } from '../../../utils/firebase'
import MenuKeys from '../../sider/config'

const { SubMenu, Item } = Menu

const { Header } = Layout
var view = function () {
	const { logout } = this
	const { user, drawer, horizontalMenu, WEBSITELOGO } = this.props
	if (!user) {
		return null
	}
	const { role } = user

	let menus = MenuKeys.filter((item) => {
		if (item.role instanceof Function) {
			return item.role(role)
		}
		if (typeof item.role === 'undefined') {
			return true
		}
		return item.role === role
	})

	const content = (
		<div className="popover-content">
			<div className="user-info">
				<Avatar
					icon="user"
					shape="square"
					size="large"
					src={getProfilePicture(user, {
						height: 100,
					})}
				/>
				<div className="user">
					<p className="name">{user.displayName}</p>
					<p className="email">{user.email}</p>
				</div>
			</div>
			<div className="other-links">
				<ul>
					<li>
						<Link onClick={logout.bind(this)}>Sign Out</Link>
					</li>
				</ul>
			</div>
		</div>
	)

	return (
		<Header
			className={
				'header fixed secured ' + (horizontalMenu ? 'with-horizontal-menu' : {})
			}
		>
			<div className="top-section">
				<div className="trigger drawer">
					<Icon
						className={'trigger-icon'}
						type={!drawer ? 'menu-unfold' : 'menu-fold'}
						onClick={this.toggle.bind(this)}
					/>
				</div>

				<Link routeKey="home" className="logo">
					<img src={WEBSITELOGO} alt="logo" />
				</Link>
				<div className="navigation">
					<ul>
						<li>
							<Link className="profile-link">
								<Popover
									ref={(ref) => {
										this.profilePopoverMenu = ref
									}}
									placement="bottomRight"
									content={content}
									trigger="click"
									className="header-popover"
								>
									<div className="user-image">
										<Avatar
											icon="user"
											shape="square"
											src={getProfilePicture(user, {
												height: 100,
											})}
										/>
									</div>
								</Popover>
							</Link>
						</li>
					</ul>
				</div>
			</div>
			{horizontalMenu ? (
				<div className="bottom-section">
					<div className="horizontal-menu">
						<Menu
							theme="light"
							mode="horizontal"
							onClick={this.handleMenuClick}
						>
							{menus.map((item) => {
								const { icon, name, children, key } = item
								if (children) {
									return (
										<SubMenu key={key} title={name}>
											{children.map((child) => {
												const { icon, name, key } = child
												return (
													<Item key={key}>
														<Icon type={icon} />
														<span>{name}</span>
													</Item>
												)
											})}
										</SubMenu>
									)
								} else {
									return (
										<Item key={key}>
											<Icon type={icon} />
											<span>{name}</span>
										</Item>
									)
								}
							})}
						</Menu>
					</div>
				</div>
			) : null}
		</Header>
	)
}
export default view
