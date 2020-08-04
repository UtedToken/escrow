export function getName(profile) {
	return (profile.firstName || '') + ' ' + (profile.lastName || '')
}
