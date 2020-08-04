import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../preprocess'
import { createAction, ActionNames } from '../../redux/actions'
import { goToRoute, addOnRouteChange } from '../../routes'
import axios from 'axios'
import { scrollToTopWindow } from '../../utils/web'
import { delay } from '../../utils/common'
import {
	setAuthorizationHeader,
	clearAuthorizationHeader,
} from '../../utils/security'
import { getCurrentRoute } from '../container-helpers/routing'
import { message } from 'antd'

const spinningSelector = 'body'

/**
 * @description Main Container
 * @type Container
 */
class Main extends Component {
	/**
	 * Constructor
	 * @param props
	 */
	constructor(props) {
		super(props)
		/**
		 * Apply 401 Handler
		 */
		this.apply401Handler()
		this.getCurrentRoute = getCurrentRoute.bind(this)
		addOnRouteChange(this.onRouteChange.bind(this))
		if (typeof document !== 'undefined') {
			window.startSpinning(spinningSelector)
		}
		this.state = {
			drawer: false,
			pageReady: false,
		}
		this.getConfigurations = this.getConfigurations.bind(this)
	}

	/**
	 * Toggle DropDown
	 */
	toggleDrawer() {
		this.setState({
			drawer: !this.state.drawer,
		})
	}

	/**
	 * On Main Component Mount
	 */
	async componentDidMount() {
		const { emitter } = this.props
		emitter.addListener('AUTHENTICATED', this.onAuthenticate.bind(this))
		this.configureAntd()
		await this.getConfigurations()
	}

	/**
	 * get Configurations
	 * @returns {Promise<void>}
	 */
	async getConfigurations() {
		const { getConfigs } = this.props
		try {
			const { error, payload } = await getConfigs()
			if (error) {
				throw payload.response.data
			}
		} catch (e) {
			message.error(e.message)
		}
	}

	/**
	 * On Route Change
	 */
	onRouteChange() {
		this.checkAccess()
		this.scrollToTop()
		this.props.reset()
	}

	/**
	 * Check access to route
	 */
	checkAccess() {
		//
		const currentRoute = this.props.routes[this.props.routes.length - 1]
		const { user, auth } = this.props
		if (
			auth &&
			auth.uid &&
			!auth.emailVerified &&
			currentRoute.routeKey !== 'emailNotConfirm'
		) {
			goToRoute('emailNotConfirm')
			return
		}
		if (currentRoute.role && auth.uid) {
			if (!(user.role === currentRoute.role)) {
				goToRoute('home')
				message.error('You are not authorized to access this page')
			}
		}
	}

	/**
	 * On Authenticate Handler
	 */
	async onAuthenticate() {
		const { auth, translate } = this.props
		const currentRoute = this.props.routes[this.props.routes.length - 1]
		/**
		 * Set Authorization Header always if auth has changed
		 */
		setAuthorizationHeader(auth)
		try {
			await this.getProfile()
			// emitter.emit("USER_FETCHED");
		} catch (e) {
			console.log(e)
			message.error(translate('common.server.error.unexpected'))
			goToRoute('login')
		}
		/**
		 * check that email is confirm if not user does not get logged in
		 */
		const { emailVerified } = auth
		if (!emailVerified) {
			message.warn(translate('signUp.accountVerification.warning'))
			goToRoute('emailNotConfirm')
		} else {
			/**
			 * if the route is guest only then redirect to home
			 */
			if (currentRoute.guestOnly && auth.uid) {
				goToRoute('home')
			}
			if (currentRoute.path === '/') {
				goToRoute('home')
			}
		}
		window.stopSpinning(spinningSelector)
	}

	/**
	 * Get Profile
	 */
	async getProfile() {
		const { getProfile, getDashboard } = this.props
		try {
			await getProfile()
			//await getDashboard();
		} catch (e) {
			throw e
		}
	}

	/**
	 * Configure Antd
	 */
	configureAntd() {}

	/**
	 * Component will receive props hook
	 */
	async componentWillReceiveProps(newProps) {
		if (newProps.isReady && !this.props.isReady) {
			/**
			 * This delay is important because it takes some milliseconds
			 * for new props to take effect and the autologin and onAuthenticate with old props
			 * does not have auth
			 */
			await delay(0.5)
			await this.autoLogin()
		}
		/**
		 * 2 cases -
		 * User is not logged In -
		 * Check on auth ready if the user is logged in - check if
		 * user has been fetched
		 */
		if (this.props.isReady) {
			if (this.props.auth.uid) {
				if (this.props.auth.emailVerified) {
					if (!this.props.user && newProps.user) {
						this.setState({
							pageReady: true,
						})
					}
				} else {
					this.setState({
						pageReady: true,
					})
				}
			} else {
				this.setState({
					pageReady: true,
				})
			}
		}
	}

	/**
	 * Auto login a user if already authenticated
	 */
	async autoLogin() {
		const { props } = this
		const { auth } = props
		const currentRoute = props.routes[props.routes.length - 1]
		let isLoggedIn
		if (typeof auth === 'undefined') {
			isLoggedIn = false
		} else {
			if (auth.uid) {
				isLoggedIn = true
			} else {
				isLoggedIn = false
			}
		}

		if (isLoggedIn) {
			props.emitter.emit('AUTHENTICATED')
		} else {
			/**
			 * User not authenticated
			 * If it is a public route, then allow transition and don't ask the user to
			 * login.
			 */
			if (!currentRoute.public) {
				goToRoute('login')
			}
			window.stopSpinning(spinningSelector)
		}
	}

	/**
	 * Logout Handler
	 * @param redirect
	 */
	logout(redirect) {
		const { firebase } = this.props
		/**
		 * Refresh whole page in order to reset the whole state
		 */
		firebase.logout()
		/**
		 * Clear Authorization Header
		 */
		clearAuthorizationHeader()
		redirect
			? goToRoute('login', {
					forceRefresh: true,
			  })
			: null
	}

	/**
	 * 401 Handler in case a ajax request results in 401 Error
	 */
	apply401Handler() {
		// Add a response interceptor to axios to handle session expiry
		axios.interceptors.response.use(
			(response) => {
				if (response.status === 401) {
					this.logout(true)
				}
				// Do something with response data
				return response
			},
			(error) => {
				/**
				 * If 401 error in ajax request logout
				 */
				if (error.response && error.response.status === 401) {
					this.logout(true)
					//Show a modal here for the user to tell that his sesssion has expired.
				}
				return Promise.reject(error)
			},
		)
	}

	scrollToTop() {
		setTimeout(() => {
			scrollToTopWindow()
		}, 200)
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
		logout: () => {
			return dispatch(createAction(ActionNames.LOGOUT))
		},
		reset: () => {
			return dispatch(createAction(ActionNames.RESET))
		},
		getConfigs: () => {
			return dispatch(createAction(ActionNames.GET_CONFIGS))
		},
		getProfile: (data) => {
			return dispatch(createAction(ActionNames.GET_PROFILE, data))
		},
		getDashboard: () => {
			return dispatch(createAction(ActionNames.GET_DASHBOARD))
		},
	}
}
/**
 * Bind State to props
 * @returns {{Object}}
 * @param state
 */
const mapStateToProps = (state) => {
	const auth = state.firebase.auth
	return {
		auth: auth,
		emitter: state.emitter,
		isReady: !state.firebase.isInitializing && auth.isLoaded,
		user: state.user,
	}
}
Main.displayName = 'Main-Container'
//Pre process the container with Redux Plugins
export default preProcess(Main, {
	connect: [mapStateToProps, bindAction],
	localize: true,
	firebase: true,
})
