import React, { Component } from 'react'
import ComponentView from './view'

/**
 * @description Sample Component
 * @type Component
 * @author Inderdeep
 */
export default class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		this.state = {
			sdkLoaded: false,
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	async componentDidMount() {
		const { initialize } = this.props
		try {
			await initialize()
			this.setState({
				sdkLoaded: true,
			})
		} catch (e) {
			console.log(e)
		}
	}

	/**
	 * Render Method
	 * @returns {*}
	 */
	render() {
		return ComponentView.bind(this)()
	}
}

Main.displayName = 'Sample-Component'
