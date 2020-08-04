import React from 'react'
import './styles.scss'
import { Col, Row, Icon } from 'antd'
import Link from 'core-components/link'
import logo from '../../images/logo.png'

var view = function () {
	return (
		<div className="footer">
			<div className="main">
				<div className="container">
					<Row gutter={48}>
						<Col xs={12} sm={12} md={6} lg={6} xl={6}>
							<Link routeKey="landing" className="logo">
								<img src={logo} alt={'logo'} />
							</Link>
						</Col>
						<Col xs={12} sm={12} md={6} lg={6} xl={6}>
							<p className="label">Sell</p>
							<ul>
								<li>
									<Link>Link</Link>
								</li>
								<li>
									<Link>Link</Link>
								</li>
								<li>
									<Link>Link</Link>
								</li>
								<li>
									<Link>Link</Link>
								</li>
							</ul>
						</Col>
						<Col xs={12} sm={12} md={6} lg={6} xl={6}>
							<p className="label">About</p>
							<ul>
								<li>
									<Link>Link</Link>
								</li>
								<li>
									<Link>Link</Link>
								</li>
								<li>
									<Link>Link</Link>
								</li>
								<li>
									<Link>Link</Link>
								</li>
							</ul>
						</Col>
						<Col xs={12} sm={12} md={6} lg={6} xl={6}>
							<p className="label">Social</p>
							<ul>
								<li>
									<Link>Link</Link>
								</li>
								<li>
									<Link>Link</Link>
								</li>
								<li>
									<Link>Link</Link>
								</li>
								<li>
									<Link>Link</Link>
								</li>
							</ul>
						</Col>
					</Row>
				</div>
			</div>
			<div className="others">
				<div className="container">
					<div>
						<p>2019 All Rights Reserved</p>
					</div>
					<div>
						<ul>
							<li>
								<Link to={'terms'}>Terms</Link>
							</li>
							<li>
								<Link to={'policy'}>Policy</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
export default view
