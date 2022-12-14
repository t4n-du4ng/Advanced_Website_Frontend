import { AUTH } from './_constanst'
import { map } from 'utils/axios'
import { isSuccess } from 'utils/func'
import TokenService from 'utils/axios/token.axios'

export const register = (params = {}) => {
	return map(({ data, ...rest }) => {
		return isSuccess(rest) ? { data: data } : { error: rest.response.data }
	}).post(AUTH.REGISTER, params)
}

export const login = (params = {}) => {
	return map(({ data, ...rest }) => {
		if (isSuccess(rest)) {
			if (data.accessToken) {
				TokenService.setUser(data)
			}

			return { data: data }
		} else {
			return { error: rest.response.data }
		}
	}).post(AUTH.LOGIN, params)
}

export const refreshToken = (params = {}) => {
	return map(({ data, ...rest }) => {
		return isSuccess(rest) ? { data: data } : { data: {} }
	}).post(AUTH.REFRESH_TOKEN, params)
}

export const logout = (params = { refreshToken: TokenService.getLocalRefreshToken() }) => {
	return map(({ data, ...rest }) => {
		if (isSuccess(rest)) {
			TokenService.removeUser()
			return { data: data }
		} else {
			return { error: rest.response.data }
		}
	}).post(AUTH.LOGOUT, params)
}
