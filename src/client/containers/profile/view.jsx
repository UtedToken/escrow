import React from 'react'
import './styles.scss'
import { Avatar, Button } from 'antd'
import { getProfilePicture } from '../../utils/firebase'
import Link from '../../components/link'
import { getEmail } from '../../utils/firebase'

var view = function () {
	const { auth } = this.props
	return (
		<div className="profile">
			<div className="content">
				<div className="details">
					<Avatar src={getProfilePicture(auth)} />
					<div className="form-details">
						<div className="item">
							<span className="label">Name</span>
							<span className="colon">:</span>
							<span className="value">{auth.displayName}</span>
						</div>
						<div className="item">
							<span className="label">Email</span>
							<span className="colon">:</span>
							<span className="value">
								{getEmail(auth) || 'No Email Address Found'}
							</span>
						</div>
						<div className="item">
							<span className="label">Phone No.</span>
							<span className="colon">:</span>
							<span className="value">
								{auth.phoneNumber || 'No Phone Number Found'}
							</span>
						</div>
					</div>
					<div className="action">
						<Link routeKey="settings">
							<Button size="large" className="edit-btn">
								Edit Profile
							</Button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
export default view
