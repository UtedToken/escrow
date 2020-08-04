import uuid from 'uuid'
import firebase from 'firebase'
import { decode } from 'base-64'

const uploadedFilesPath = 'uploadedFiles'

/**
 * Get Profile Picture from firebase
 * auth object
 * @param auth
 * @param config
 * @returns {string}
 */
export function getProfilePicture(auth, config) {
	let url = 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
	config = config || {}
	if (auth.photoURL) {
		url = auth.photoURL
		if (url.indexOf('graph.facebook') !== -1) {
			url = url + `?height=${config.height || 300}`
		}
	}
	return url
}

/**
 * Get Email from firebase since in case of
 * Social Providers, Email is not present as primary email
 * It needs to be fetched from providerData
 * auth object
 * @param auth
 * @param config
 * @returns {string}
 */
export function getEmail(auth, config) {
	let email = auth.email || null
	config = config || {}
	if (!email && auth.providerData) {
		for (let provider of auth.providerData) {
			if (provider.email) {
				email = provider.email
				break
			}
		}
	}
	return email
}

/**
 * Get First Name from firebase
 * @param auth
 * @param config
 * @returns {Array}
 */
export function getSplittedName(auth) {
	let name = auth.displayName || '  '
	return name.split(' ')
}

/**
 * Upload Files
 * @param files
 * @param filesPath - Optional
 * @param dbPath - Optional
 */
export function uploadFilesBase64(
	firebase,
	files,
	filesPath = uploadedFilesPath,
	dbPath = uploadedFilesPath,
) {
	return uploadFiles(
		firebase,
		files.map((file) => {
			return dataURLtoBlob(file)
		}),
		filesPath,
		dbPath,
	)
}

/**
 * Upload Files
 * @param files
 * @param filesPath - Optional
 * @param dbPath - Optional
 */
export function uploadFiles(
	firebase,
	files,
	filesPath = uploadedFilesPath,
	dbPath = uploadedFilesPath,
) {
	if (!firebase) {
		console.error('Firebase instance has to be passed')
		return Promise.resolve(null)
	}
	return firebase.uploadFiles(filesPath, files, dbPath, {
		name: uuid.v4(),
	})
}

/**
 * Get Current User from Auth
 * @param firebase
 * @returns {*|firebase.User|null}
 */
export function getCurrentUserAuth(firebase) {
	return firebase.auth().currentUser
}

/**
 * Get Phone Number
 * @param auth
 * @returns {string}
 */
export function getPhoneNumber(auth) {
	return auth ? auth.phoneNumber : ''
}

/**
 * Get RecaptchaVerifier
 * @param firebase
 * @param element
 */
export async function getRecaptchaVerifierWeb(firebase, element, config) {
	let widgetId = null
	const verifier = new firebase.auth.RecaptchaVerifier(element, {
		size: 'invisible',
		'expired-callback': () => {
			resetRecaptcha(widgetId)
		},
		...config,
	})
	widgetId = await verifier.render()
	resetRecaptcha(widgetId)
	verifier.widgetId = widgetId
	return verifier
}

/**
 * Reset Recaptcha
 * @param widgetId
 */
export function resetRecaptcha(widgetId, elementId) {
	if (window.grecaptcha) {
		widgetId ? window.grecaptcha.reset(elementId) : window.grecaptcha.reset()
	}
}

/**
 * Link Phone Number
 * @param firebase
 * @param phone
 * @param formButtonId
 * @returns {Promise.<*>}
 */
export async function linkPhoneNumber(firebase, phone, recaptchaVerifier) {
	const currentUser = firebase.auth().currentUser
	let result = null
	if (phone === currentUser.phoneNumber) {
		return null
	}
	try {
		//const recaptchaVerifier = getRecaptchaVerifierWeb(firebase,formButtonId);
		if (!currentUser.phoneNumber) {
			result = await currentUser.linkWithPhoneNumber(phone, recaptchaVerifier)
		} else {
			result = await firebase
				.auth()
				.signInWithPhoneNumber(phone, recaptchaVerifier)
		}
		const { verificationId } = result
		/**
		 * Todo : Put it via translate
		 * Replace prompt with otp
		 */
		const otp = window.prompt(
			'Please enter the verification ' +
				'code that was sent to your mobile device.',
		)
		const credential = firebase.auth.PhoneAuthProvider.credential(
			verificationId,
			otp,
		)
		if (!firebase.auth().currentUser.phoneNumber) {
			result = await firebase.auth().currentUser.linkWithCredential(credential)
		} else {
			result = await firebase.auth().currentUser.updatePhoneNumber(credential)
		}
		resetRecaptcha()
		return result
	} catch (e) {
		resetRecaptcha()
		throw e
	}
}

/**
 * Upload File Base64
 * @param files
 * @param filesPath - Optional
 */
export async function uploadFileBase64(
	file,
	filesPath = uploadedFilesPath,
	config,
) {
	const storageRef = firebase.storage().ref()
	const childRef = storageRef.child(filesPath)
	await childRef.putString(getBase64FromDataUri(file))
	const downloadURL = childRef.getDownloadURL()
	return downloadURL
}

/**
 * Upload File blob
 * @param file
 * @param filesPath - Optional
 */
export async function uploadFileBlob(
	file,
	filesPath = uploadedFilesPath,
	config,
) {
	const storageRef = firebase.storage().ref()
	const childRef = storageRef.child(filesPath)
	await childRef.put(file)
	const downloadURL = childRef.getDownloadURL()
	return downloadURL
}

/**
 * Upload File
 * @param file
 * @param filesPath
 * @returns {Promise}
 */
export async function uploadFile(file, filesPath = uploadedFilesPath, config) {
	config = config || {}

	if (file instanceof Blob || file instanceof File) {
		config.contentType = file.type || config.contentType
		return uploadFileBlob(file, filesPath, config)
	} else if (typeof file === 'string') {
		const forceBlob = config.forceBlob
		if (file.startsWith('file://')) {
			let response = await fetch(file)
			file = await response.blob()
			return uploadFileBlob(file, filesPath, config)
		} else {
			if (forceBlob && typeof file === 'string') {
				file = dataURLtoBlob(file)
				return uploadFileBlob(file, filesPath, config)
			} else {
				return uploadFileBase64(file, filesPath)
			}
		}
	} else {
		throw 'Invalid file type'
	}
}

/**
 * Upload Image
 * @param file
 * @param filesPath
 * @returns {Promise}
 */
export async function uploadImage(file, filesPath = uploadedFilesPath, config) {
	return uploadFile(file, filesPath, {
		contentType: 'image/png',
		...config,
	})
}

/**
 * Convert data URI to blob
 * @param dataurl
 * @returns {*}
 */
export function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = decode(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n)
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n)
	}
	return new Blob([u8arr], {
		type: mime,
	})
}

/**
 * Get base64 from data uri
 * @param dataurl
 * @returns {*}
 */
export function getBase64FromDataUri(dataurl) {
	var arr = dataurl.split(',')
	return arr.length > 1 ? arr[1] : dataurl[0]
}
