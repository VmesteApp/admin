import axios from 'axios'
import { Api } from '../constants/api'
import { logout } from '../helpers/checkAuth'

const api = axios.create({
	baseURL: Api.Main,
	headers: {
		'content-type': 'application/json',
	},
})

api.interceptors.request.use(
	config => {
		const token = sessionStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

api.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 401) console.log('Error 401')
		return Promise.reject(error)
	}
)

export default api
