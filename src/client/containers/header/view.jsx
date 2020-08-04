import React from 'react'
import './styles.scss'
import SecuredHeader from './secureHeader'
import PublicHeader from './publicHeader'

var view = function () {
	let { type } = this.props

	if (typeof type === 'undefined') {
		type = 'public'
	}
	switch (type) {
		case 'secured':
			return <SecuredHeader {...this.props} />
		case 'public':
			return <PublicHeader {...this.props} />
		default:
			return null
	}
}
export default view
