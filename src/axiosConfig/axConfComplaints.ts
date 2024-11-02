import axios from 'axios'
import { Api } from '../constants/api'
import { logout } from '../helpers/checkAuth'

const apiComplaints = axios.create({
	baseURL: Api.Complaints,
	headers: {
		'content-type': 'application/json',
	},
})

apiComplaints.interceptors.request.use(
	config => {
		const token = sessionStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	error => Promise.reject(error)
)

apiComplaints.interceptors.response.use(
	response => response,
	error => {
		if (error.response.status === 401) logout()
		return Promise.reject(error)
	}
)

export default apiComplaints
