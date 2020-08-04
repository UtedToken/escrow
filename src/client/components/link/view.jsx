import React from 'react'
import './styles.scss'
import { Link } from 'react-router'

/**
 * View for the component
 * @returns {XML}
 */
var view = function () {
	const link = this.getRoute()
	const props = this.getLinkProps()
	return !link ? <Link {...props} /> : <Link to={link} {...props} />
}
export default view
