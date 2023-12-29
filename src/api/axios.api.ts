import axios from 'axios'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper'

/* export const instance = axios.create({
	baseURL: 'http://localhost:8800/api',
	headers: {
		Authorization: `Bearer ` + getTokenFromLocalStorage(),
	},
}) */

/* Проблема в том, что при создании axios инстанса в глобальной области кода, 
заголовок Authorization устанавливается только один раз при инициализации. 
Даже если токен меняется в локальном хранилище, это не отразится на уже созданном axios инстансе.
Вам нужно обновлять заголовок с токеном каждый раз перед отправкой запроса. 
Для этого вы можете использовать interceptors у axios */
export const instance = axios.create({
	baseURL: 'http://localhost:8800/api',
})

instance.interceptors.request.use(
	(config) => {
		const token = getTokenFromLocalStorage()
		if (token) {
			config.headers.Authorization = `Bearer ${token}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	},
)
