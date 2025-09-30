import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

const api = axios.create({ baseURL: API_URL })

//  Request interceptor: добавляем токен в заголовки
api.interceptors.request.use(config => {
	const token = localStorage.getItem('accessToken')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

//  Response interceptor: автообновление access token
api.interceptors.response.use(
	res => res,
	async err => {
		const originalRequest = err.config
		if (err.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true
			const refreshToken = localStorage.getItem('refreshToken')
			if (refreshToken) {
				const { data } = await axios.post(`${API_URL}/auth/refresh-token`, {
					refreshToken,
				})
				localStorage.setItem('accessToken', data.accessToken)
				originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`
				return axios(originalRequest)
			}
		}
		return Promise.reject(err)
	}
)

export default api
