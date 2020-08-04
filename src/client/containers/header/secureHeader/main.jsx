import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { createAction, ActionNames } from '../../../redux/actions'
import { goToRoute, addOnRouteChange } from '../../../routes'
import { message, Button, notification } from 'antd'

/**
 * @description Sample Container
 * @type Container
 */
class Main extends Component {
	/**
	 * Container
	 * @param props
	 */
	constructor(props) {
		super(props)
		this.profilePopoverMenu = null
		this.state = {}
		this.showModal = this.showModal.bind(this)
		this.resendEmail = this.resendEmail.bind(this)
	}

	async resendEmail() {
		const { resendEmail, translate } = this.props
		try {
			const { error, payload } = await resendEmail()
			if (error) {
				throw payload.response.data
			}
			message.info(translate('signUp.success'))
		} catch (e) {
			message.error(e.message || '')
		}
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {
		const { emitter, toggleHorizontalMenu } = this.props
		addOnRouteChange(this.closeProfilePopoverMenu.bind(this))
		emitter.addListener('USER_FETCHED', () => {
			this.checkForEmailConfirmation()
		})
		toggleHorizontalMenu(false)
	}

	/**
	 * Check for email confirmation
	 */
	checkForEmailConfirmation() {
		const { user } = this.props
		if (user.emailVerified) {
			return
		}
		const key = `open${Date.now()}`
		const btn = (
			<Button type="primary" size="small" onClick={this.resendEmail}>
				Resend Email
			</Button>
		)
		notification.open({
			message: 'Email Not Confirmed',
			description:
				'Your email has not been yet confirmed, Please confirm your email',
			btn,
			key,
		})
	}

	/**
	 * Show Modal
	 */
	showModal() {
		const { setUiProperty } = this.props
		setUiProperty({
			name: 'modal',
			value: true,
		})
	}

	toggle() {
		const { toggleDrawer, drawer } = this.props
		toggleDrawer(drawer)
	}

	/**
	 * Logout
	 */
	logout() {
		const { firebase } = this.props
		this.closeProfilePopoverMenu()
		firebase.logout()
		goToRoute('login', {
			forceRefresh: true,
		})
	}

	/**
	 * Close Popover menu
	 */
	closeProfilePopoverMenu() {
		if (this.profilePopoverMenu) {
			this.profilePopoverMenu.tooltip.setState({
				visible: false,
			})
		}
	}

	/**
	 * onClick menu navigate to specific route
	 * @returns {*}
	 */
	handleMenuClick(e) {
		console.log(e)
		goToRoute(e.key)
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
		toggleDrawer: (drawer) => {
			return dispatch(
				createAction(ActionNames.UI_SET_PROPERTY, {
					name: 'drawer',
					value: !drawer,
				}),
			)
		},
		toggleHorizontalMenu: (menu) => {
			return dispatch(
				createAction(ActionNames.UI_SET_PROPERTY, {
					name: 'horizontalMenu',
					value: !!menu,
				}),
			)
		},
		setUiProperty: (data) => {
			return dispatch(createAction(ActionNames.UI_SET_PROPERTY, data))
		},
		resendEmail: () => {
			return dispatch(createAction(ActionNames.RESEND))
		},
	}
}
/**
 * Bind State to props
 * @param dispatch
 * @returns {{Object}}
 */
const mapStateToProps = ({ emitter, user, firebase, ui, config }) => {
	const { configuration } = config || {}
	const { WEBSITELOGO } = configuration || {}
	return {
		emitter,
		user,
		WEBSITELOGO,
		auth: firebase.auth,
		drawer: !!ui.drawer,
		ui,
		horizontalMenu: ui.horizontalMenu,
	}
}
Main.displayName = 'Header'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
