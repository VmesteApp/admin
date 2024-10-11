import { sessionRemover } from '../helpers/browserStorage'

export const goToProfiles = () => {
	window.location.assign('profiles')
}
export const goToPulses = () => {
	window.location.assign('pulses')
}
export const goToTags = () => {
	window.location.assign('tags')
}
export const goToAdminProfile = () => {
	window.location.assign('/')
}
export const logout = () => {
	sessionRemover()
	window.location.href = '/'
}
