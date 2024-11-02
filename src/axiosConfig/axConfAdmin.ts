import axios from 'axios'
import { Api } from '../constants/api'
import { logout } from '../helpers/checkAuth'

const apiAdmin = axios.create({
	baseURL: Api.Auth,
	headers: {
		'content-type': 'application/json',
	},
})

apiAdmin.interceptors.request.use(
	config => {
		const token = sessionStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

apiAdmin.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 401) logout()
		return Promise.reject(error)
	}
)

export default apiAdmin
