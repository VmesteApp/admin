import { sessionRemover } from '../helpers/browserStorage'

export const isAuthenticated = () => {
	if (sessionStorage.getItem('token')) return true
	else return false
}

export const hasRole = (role: string) => {
	if (role === sessionStorage.getItem('role')) return true
	else return false
}

export const logout = () => {
	sessionRemover()
	window.location.href = '/'
}
