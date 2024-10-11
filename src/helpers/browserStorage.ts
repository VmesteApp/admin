export const sessionRemover = () => {
	sessionStorage.removeItem('id')
	sessionStorage.removeItem('token')
	sessionStorage.removeItem('role')
}
