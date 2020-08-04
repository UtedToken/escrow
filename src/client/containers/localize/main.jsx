/**
 * Localize Container to render localized strings
 */
import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../preprocess'

class Main extends Component {
	static get defaultProps() {
		return {
			title: 'Localize',
		}
	}

	render() {
		return ComponentView.bind(this)()
	}
}

Main.displayName = 'Localize'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	localize: true,
})
