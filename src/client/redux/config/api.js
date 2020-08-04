//Changes for razzle
if (typeof window === 'undefined') {
	require('../../../browser')
}

export const SERVER = window.app.server

export const SEND_EMAIL = SERVER + 'email'
export const ADMIN_ENTITIES = SERVER + 'admin'
export const NORMAL_ENTITIES = SERVER + 'admin'
export const PUSH_NOTIFICATIONS = 'send-notifications'
export const PASSWORD_RESET = SERVER + 'password-reset'
export const CONFIRM_EMAIL = SERVER + 'confirm-email'
export const AUTHENTICATE = SERVER + 'authenticate'
export const REGISTER = SERVER + 'register'
export const GET_CONFIGS = SERVER + 'web-client-config/all'
export const GET_MEMBERSHIPS = SERVER + 'memberships'
export const UPDATE_CURRENT_USER = SERVER + 'users/current/update'
export const GET_CURRENT_USER = SERVER + 'users/current/get'
export const STORAGE = SERVER + 'storage'
export const APPS = SERVER + 'apps'
export const DASHBOARD = SERVER + 'dashboard'
export const APP_CONFIGURATIONS = SERVER + 'app-configurations'
export const BUILDS = SERVER + 'builds'
export const PROJECTS = SERVER + 'projects/current/get'
export const DOWNLOADPROJECT = SERVER + 'projects/download'
export const ACCEPT_WORK = SERVER + 'projects/accept'
export const GET_DOCUMENTS = SERVER + 'assignments/current/get'
export const GET_WORK_BY_USER = SERVER + 'assignments/byUserId/'
export const SUBMIT_DOCUMENT = SERVER + 'documents/submit'
export const SAVE_DOCUMENT = SERVER + 'documents/save'
export const GET_DOCUMENT = SERVER + 'documents/byDocumentId'
export const GET_DOCUMENT_HISTORY = SERVER + 'document-history/byDocument/'
export const REVERT = SERVER + 'documents/revert/'
