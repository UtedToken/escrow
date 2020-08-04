import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { SocialSignIn } from '../../../config'
import { createAction, ActionNames } from 'app-redux/actions'

/**
 * @description Social Sign In Container
 * @type Container
 */
class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		this.toggleForm = this.toggleForm.bind(this)
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {}

	toggleForm() {
		const { ui, setUiProperty } = this.props
		setUiProperty({
			name: 'signIn',
			value: !ui.signIn,
		})
	}

	socialSignIn(provider) {
		const { firebase } = this.props
		firebase.login({
			provider: provider,
			type: 'redirect',
			scopes: SocialSignIn[provider].scopes || [],
		})
	}

	/**
	 * Render Method
	 * @returns {*}
	 */
	render() {
		return ComponentView.bind(this)()
	}
}

/**
 * Bind Redux Actions
 * @param dispatch
 * @returns {{Object}}
 */
const bindAction = (dispatch) => {
	return {
		setUiProperty: (data) => {
			return dispatch(createAction(ActionNames.UI_SET_PROPERTY, data))
		},
	}
}
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = ({ ui }) => {
	return {
		ui,
	}
}
Main.displayName = 'Social-SignIn'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
