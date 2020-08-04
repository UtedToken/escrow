import React, { Component } from 'react'
import ComponentView from './view'
import preProcess from '../../preprocess'
import { createAction, ActionNames } from '../../../redux/actions'
import { getCurrentRoute } from '../../container-helpers/routing'
import { Form } from 'antd'
import { goToRoute } from '../../../routes'

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
		this.state = {
			scrolled: false,
			visible: false,
			value: '',
			dataSource: [],
		}
		this.getCurrentRoute = getCurrentRoute.bind(this)
		this.setValidations()
	}

	/**
	 * Sets Validations for fields
	 */
	setValidations() {
		this.validations = {
			number: {
				rules: [{ required: true, message: 'Please enter tracking number' }],
			},
		}
	}

	handleLanguageChange(value) {}

	handleSearch(event) {
		event.preventDefault()
		const { form } = this.props
		const { validateFieldsAndScroll } = form
		validateFieldsAndScroll((errors, values) => {
			if (errors) {
				return
			}
			const { number } = values
			goToRoute('track', {
				routeParams: {
					id: number,
				},
			})
		})
	}

	onSearch(searchText) {
		this.setState({
			dataSource: !searchText
				? []
				: [searchText, searchText.repeat(2), searchText.repeat(3)],
		})
	}

	onSelect(value) {}

	onChange(value) {
		this.setState({ value })
	}

	toggleForm() {
		const { setUiProperty } = this.props
		setUiProperty({
			name: 'activeTab',
			value: 'signIn',
		})
	}

	showModal() {
		this.setState({
			visible: true,
		})
	}

	handleCancel(e) {
		this.setState({
			visible: false,
		})
	}

	/**
	 * ComponentDidMount Hook
	 */
	componentDidMount() {
		window.addEventListener('scroll', (event) => {
			if (window.pageYOffset > 200) {
				this.setState({
					scrolled: true,
				})
			} else {
				this.setState({
					scrolled: false,
				})
			}
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
const mapStateToProps = ({ ui, config }) => {
	const { configuration } = config || {}
	const { WEBSITELOGO } = configuration || {}
	return {
		ui,
		WEBSITELOGO,
	}
}

Main.displayName = 'Landing-Page'
//Pre process the container with Redux Plugins
export default preProcess(Form.create()(Main), {
	connect: [mapStateToProps, bindAction],
	localize: true,
	withRouter: true,
})
