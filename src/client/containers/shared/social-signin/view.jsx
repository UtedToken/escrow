import React from 'react'
import './styles.scss'
import { Icon } from 'antd'
import Link from '../../../components/link'

var view = function () {
	const { ui } = this.props
	return (
		<div className="options shared">
			{ui.signIn ? (
				<div className="option">
					<p className="optionLabel">Become a member</p>
					<Link className="textLink" onClick={this.toggleForm}>
						Sign Up
					</Link>
				</div>
			) : (
				<div className="option">
					<p className="optionLabel">Already a member</p>
					<Link className="textLink" onClick={this.toggleForm}>
						Sign In
					</Link>
				</div>
			)}

			<div className="option">
				<p className="optionLabel right">Continue with</p>
				<ul>
					<li>
						<Link onClick={this.socialSignIn.bind(this, 'facebook')}>
							<i className="fa fa-facebook-official"></i>
						</Link>
					</li>
					<li>
						<Link onClick={this.socialSignIn.bind(this, 'google')}>
							<i className="fa fa-google"></i>
						</Link>
					</li>
					<li>
						<Link onClick={this.socialSignIn.bind(this, 'twitter')}>
							<i className="fa fa-twitter-square"></i>
						</Link>
					</li>
					<li>
						<Link onClick={this.socialSignIn.bind(this, 'github')}>
							<Icon type="github" />
						</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
export default view
