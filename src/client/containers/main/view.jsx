import React from 'react'
import './styles.scss'
import Header from '../header'

var view = function () {
	const { children, isReady, auth } = this.props
	const { drawer, pageReady } = this.state
	const route = this.getCurrentRoute()
	let { header } = route
	return (
		<div className="app-container">
			{pageReady ? (
				<div>
					{header !== false ? (
						<Header
							type={header}
							currentRoute={route}
							drawer={drawer}
							toggleDrawer={this.toggleDrawer.bind(this)}
						/>
					) : null}
					<div
						className={
							'main-container ' +
							(!route.public ? 'secured' : '') +
							(header === false ? 'no-header' : (header && header.type) || '')
						}
					>
						{isReady ? (!auth.uid && !route.public ? null : children) : null}
					</div>
				</div>
			) : null}
		</div>
	)
}
export default view
