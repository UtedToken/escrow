import { api } from '../config'

const ActionNames = {
	GET_CONFIGS: 'GET_CONFIGS',
	GET_MEMBERSHIPS: 'GET_MEMBERSHIPS',
	SAMPLE_ACTION: 'SAMPLE_ACTION',
	LOGIN: 'LOGIN',
	LOGOUT: 'LOGOUT',
	FORGOT: 'FORGOT',
	CHECK_LOGIN: 'CHECK_LOGIN',
	REGISTER: 'REGISTER',
	UI_SET_PROPERTY: 'UI_SET_PROPERTY',
	UI_DELETE_PROPERTY: 'UI_DELETE_PROPERTY',
	GET_PROFILE: 'GET_PROFILE',
	CHECK_DUPLICATE_EMAIL: 'CHECK_DUPLICATE_EMAIL',
	VERIFY_ACCOUNT: 'VERIFY_ACCOUNT',
	SAVE_PROFILE: 'SAVE_PROFILE',
	TOKEN_VALIDATE: 'TOKEN_VALIDATE',
	CONFIRM_EMAIL: 'CONFIRM_EMAIL',
	RESEND: 'RESEND',
	UPDATE_CURRENT_USER: 'UPDATE_CURRENT_USER',
	GET_DASHBOARD: 'GET_DASHBOARD',
	GET_PROJECTS: 'GET_PROJECTS',
	DOWNLOAD_PROJECT: 'DOWNLOAD_PROJECT',
	ACCEPT_WORK: 'ACCEPT_WORK',
	GET_DOCUMENTS: 'GET_DOCUMENTS',
	SUBMIT_DOCUMENTS: 'SUBMIT_DOCUMENTS',
	SAVE_DOCUMENT: 'SAVE_DOCUMENT',
	GET_DOCUMENT: 'GET_DOCUMENT',
	GET_DOCUMENT_HISTORY: 'GET_DOCUMENT_HISTORY',
	GET_WORK_BY_USER: 'GET_WORK_BY_USER',
	REVERT: 'REVERT',
	/**
	 * Reset is a general action for resetting data
	 */
	RESET: 'RESET',
	UPLOAD_FILE: 'UPLOAD_FILE',
	RESET_PASSWORD: 'RESET_PASSWORD',
	PASSWORD_RESET: 'PASSWORD_RESET',
	PASSWORD_RESET_REQUEST: 'PASSWORD_RESET_REQUEST',
	SEND_EMAIL: 'SEND_EMAIL',
	GET_ENTITIES: 'GET_ENTITIES',
	CREATE_ENTITY: 'CREATE_ENTITY',
	UPDATE_ENTITY: 'UPDATE_ENTITY',
	DELETE_ENTITY: 'DELETE_ENTITY',
	GET_ENTITY: 'GET_ENTITY',
	RESET_ENTITY: 'RESET_ENTITY',
	SEND_NOTIFICATIONS: 'SEND_NOTIFICATIONS',
}
export const Names = ActionNames

/**
 * Delete client fields from
 * data to be sent to server
 * @param data
 * @returns {*}
 */
function filterData(data) {
	data = {
		...data,
	}
	delete data.entityId
	delete data.entityName
	delete data.url
	return data
}

/**
 * Get Entity URl
 * @param entityName
 * @param url
 * @returns {string}
 */
function getEntityUrl({ entityName, url, entityId }) {
	let output = api['SERVER']
	if (entityName) {
		output += `${entityName}/`
	}
	if (entityId) {
		output += `${entityId}/`
	}
	if (url) {
		output += `${url}/`
	}
	output = output.replace(/\/(?=[^\/]*$)/, '')
	return output
}

/**
 * Actions configuration -
 * All actions are configured here
 * Configuration Schema - {
 *  name - Action Name
 *  type - Type of Action - ajax or normal ->
 *  config - {
 *      url => For Ajax
 *      method => For Ajax
 *      headers => For Ajax
 *      promise => For normal action -> if we want data to be resolved as dummy promise
 *      getData => General -> If we want to customize the data -> Input data is passed as argument
 *      getParams => For Ajax -> If we want to get params out of input data
 *  }
 * }
 * @type {[*]}
 */
const config = [
	{
		name: ActionNames.REVERT,
		type: 'ajax',
		config: {
			method: 'GET',
			getParams: () => ({}),
			getUrl: (id) => api.REVERT + id,
		},
	},
	{
		name: ActionNames.GET_WORK_BY_USER,
		type: 'ajax',
		config: {
			method: 'GET',
			getParams: () => ({}),
			getUrl: (uid) => api.GET_WORK_BY_USER + uid,
		},
	},
	{
		name: ActionNames.GET_DOCUMENT_HISTORY,
		type: 'ajax',
		config: {
			method: 'GET',
			getUrl: (id) => api.GET_DOCUMENT_HISTORY + id,
			getParams: () => ({}),
		},
	},
	{
		name: ActionNames.GET_DOCUMENT,
		type: 'ajax',
		config: {
			method: 'POST',
			url: api.GET_DOCUMENT,
		},
	},
	{
		name: ActionNames.SAVE_DOCUMENT,
		type: 'ajax',
		config: {
			method: 'POST',
			url: api.SAVE_DOCUMENT,
		},
	},
	{
		name: ActionNames.SUBMIT_DOCUMENTS,
		type: 'ajax',
		config: {
			method: 'POST',
			url: api.SUBMIT_DOCUMENT,
		},
	},
	{
		name: ActionNames.GET_DOCUMENTS,
		type: 'ajax',
		config: {
			url: api.GET_DOCUMENTS,
			method: 'GET',
		},
	},
	{
		name: ActionNames.ACCEPT_WORK,
		type: 'ajax',
		config: {
			url: api.ACCEPT_WORK,
			method: 'POST',
		},
	},
	{
		name: ActionNames.DOWNLOAD_PROJECT,
		type: 'ajax',
		config: {
			url: api.DOWNLOADPROJECT,
			method: 'POST',
		},
	},
	{
		name: ActionNames.GET_PROJECTS,
		type: 'ajax',
		config: {
			url: api.PROJECTS,
			method: 'GET',
		},
	},
	{
		name: ActionNames.GET_DASHBOARD,
		type: 'ajax',
		config: {
			url: api.DASHBOARD,
			method: 'GET',
		},
	},
	{
		name: ActionNames.GET_CONFIGS,
		type: 'ajax',
		config: {
			url: api.GET_CONFIGS,
			method: 'GET',
		},
	},
	{
		name: ActionNames.RESEND,
		type: 'ajax',
		config: {
			url: api.CONFIRM_EMAIL + '/resend',
			method: 'GET',
		},
	},
	{
		name: ActionNames.SAMPLE_ACTION,
		config: {
			getData: () => {
				return {
					text: 'Yo this is updated text',
				}
			},
		},
	},
	{
		name: ActionNames.RESEND,
		type: 'ajax',
		config: {
			url: api.CONFIRM_EMAIL + '/resend',
			method: 'GET',
		},
	},
	{
		name: ActionNames.GET_MEMBERSHIPS,
	},
	{
		name: ActionNames.SAMPLE_ACTION,
		config: {
			getData: () => {
				return {
					text: 'Yo this is updated text',
				}
			},
		},
	},
	{
		name: ActionNames.UI_SET_PROPERTY,
	},
	{
		name: ActionNames.UI_DELETE_PROPERTY,
	},
	{
		name: ActionNames.LOGIN,
		type: 'ajax',
		config: {
			url: api.AUTHENTICATE,
			method: 'POST',
		},
	},
	{
		name: ActionNames.UPDATE_CURRENT_USER,
		type: 'ajax',
		config: {
			url: api.UPDATE_CURRENT_USER,
			method: 'PATCH',
		},
	},
	{
		name: ActionNames.PASSWORD_RESET_REQUEST,
		type: 'ajax',
		config: {
			getUrl: ({ token }) => api.PASSWORD_RESET + '/' + token,
			getData: ({ password }) => {
				return {
					password,
				}
			},
			method: 'PATCH',
		},
	},
	{
		name: ActionNames.TOKEN_VALIDATE,
		type: 'ajax',
		config: {
			getUrl: (data) => api.PASSWORD_RESET + '/' + data,
			method: 'GET',
		},
	},
	{
		name: ActionNames.PASSWORD_RESET,
		type: 'ajax',
		config: {
			url: api.PASSWORD_RESET,
			method: 'POST',
		},
	},
	{
		name: ActionNames.CHECK_LOGIN,
		config: {
			promise: true,
		},
	},
	{
		name: ActionNames.LOGOUT,
		config: {
			promise: true,
		},
	},
	{
		name: ActionNames.FORGOT,
		type: 'ajax',
		config: {},
	},
	{
		name: ActionNames.REGISTER,
		type: 'ajax',
		config: {
			url: api.REGISTER,
			method: 'POST',
		},
	},
	{
		name: ActionNames.SEND_EMAIL,
		type: 'ajax',
		config: {
			url: api.SEND_EMAIL,
			method: 'POST',
		},
	},
	{
		name: ActionNames.CHECK_DUPLICATE_EMAIL,
		type: 'ajax',
		config: {},
	},
	{
		name: ActionNames.GET_PROFILE,
		type: 'ajax',
		config: {
			url: api.GET_CURRENT_USER,
			method: 'GET',
		},
	},

	{
		name: ActionNames.VERIFY_ACCOUNT,
		type: 'ajax',
		config: {},
	},
	{
		name: ActionNames.RESET_PASSWORD,
		type: 'ajax',
		config: {},
	},
	{
		name: ActionNames.RESET,
	},
	{
		name: ActionNames.RESET_PASSWORD,
		type: 'ajax',
		config: {},
	},
	{
		name: ActionNames.SAVE_PROFILE,
		type: 'ajax',
		config: {},
	},
	{},
	{
		name: ActionNames.GET_ENTITIES,
		type: 'ajax',
		config: {
			getUrl: getEntityUrl,
			method: 'GET',
			getParams: filterData,
		},
	},
	{
		name: ActionNames.GET_ENTITY,
		type: 'ajax',
		config: {
			getUrl: getEntityUrl,
			method: 'GET',
			getParams: filterData,
		},
	},
	{
		name: ActionNames.CREATE_ENTITY,
		type: 'ajax',
		config: {
			getUrl: getEntityUrl,
			method: 'POST',
			getData: filterData,
		},
	},
	{
		name: ActionNames.UPDATE_ENTITY,
		type: 'ajax',
		config: {
			getUrl: getEntityUrl,
			method: 'PATCH',
			getData: filterData,
		},
	},
	{
		name: ActionNames.DELETE_ENTITY,
		type: 'ajax',
		config: {
			getUrl: getEntityUrl,
			method: 'DELETE',
			getData: filterData,
		},
	},
	{
		name: ActionNames.SEND_NOTIFICATIONS,
		type: 'ajax',
		config: {
			url: api.ADMIN_ENTITIES + '/users/' + api.PUSH_NOTIFICATIONS,
			method: 'POST',
		},
	},
	{
		name: ActionNames.RESET_ENTITY,
	},
]
/**
 * Create a map so that it is easy to query
 * @type {{}}
 */
let configMap = {}
config.map((item) => {
	configMap[item.name] = item
})

export function getActionConfig(name) {
	return configMap[name]
}

export default config
