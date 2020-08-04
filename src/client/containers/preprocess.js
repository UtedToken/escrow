/**
 * Pre process a container with redux wrappers
 */
import { connect } from 'react-redux'
import { localize } from 'react-localize-redux'
import { withFirebase, firebaseConnect } from 'react-redux-firebase'
import { withRouter } from 'react-router'

export default function (container, pluginsConfiguration) {
	if (pluginsConfiguration.localize) {
		container = localize(container, 'locale')
	}
	if (pluginsConfiguration.firebase) {
		container = withFirebase(container)
	}
	if (pluginsConfiguration.firebaseConnect) {
		container = firebaseConnect(pluginsConfiguration.firebaseConnect)(container)
	}

	if (pluginsConfiguration.withRouter) {
		container = withRouter(container)
	}

	if (pluginsConfiguration.connect) {
		container = connect.apply(this, pluginsConfiguration.connect)(container)
	}
	return container
}
