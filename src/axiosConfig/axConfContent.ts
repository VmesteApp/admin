import axios from 'axios'
import { Api } from '../constants/api'
import { logout } from '../helpers/checkAuth'

const apiContent = axios.create({
	baseURL: Api.Content,
	headers: {
		'content-type': 'application/json',
	},
})

apiContent.interceptors.request.use(
	config => {
		const token = sessionStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

apiContent.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 401) logout()
		return Promise.reject(error)
	}
)

export default apiContent
