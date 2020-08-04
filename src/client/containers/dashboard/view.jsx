import React from 'react'
import './styles.scss'
import UserDashboard from './userDashboard'
import AdminDashboard from './adminDashboard'
var view = function () {
	const { user } = this.props
	return user && user.role === 'admin' ? <AdminDashboard /> : <UserDashboard />
}
export default view
