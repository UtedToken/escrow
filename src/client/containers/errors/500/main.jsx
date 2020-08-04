import React, { Component } from 'react'
import ComponentView from './view'
import { connect } from 'react-redux'

class Main extends Component {
	render() {
		return ComponentView.bind(this)()
	}
}

Main.displayName = '500'
export default connect(null, null)(Main)
