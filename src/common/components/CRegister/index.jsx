import './style.css'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { ErrorMessage } from '@hookform/error-message'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { login, register as accountRegister } from 'apis/auth.api'
import { useNavigate } from 'react-router-dom'
import CLoading from '../CLoading'

function CRegister() {
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Hãy nhập Họ tên'),
		username: Yup.string().required('Hãy nhập Tên đăng nhập'),
		password: Yup.string().required('Hãy nhập Mật khẩu').min(6, 'Mật khẩu phải hơn 6 kí tự'),
		confirmPassword: Yup.string()
			.required('Hãy nhập Mật khẩu xác nhận')
			.oneOf([Yup.ref('password')], 'Mật khẩu không khớp'),
	})

	const formOptions = { resolver: yupResolver(validationSchema) }

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm(formOptions)

	const onSubmit = async (data) => {
		setLoading(true)
		const resRegister = await accountRegister(data)

		if (resRegister.data) {
			const accountLogin = {
				username: data.username,
				password: data.password,
			}
			const resLogin = await login(accountLogin)
			if (resLogin?.data) {
				setTimeout(() => {
					setLoading(false)
				}, 600)
				navigate(-1)
			} else {
				setError(resLogin.error.message)
				setTimeout(() => {
					setLoading(false)
				}, 600)
			}
		} else {
			setError(resRegister.error.message)
			setTimeout(() => {
				setLoading(false)
			}, 600)
		}
	}

	return (
		<div>
			<div className='register'>
				<div className='register__top'>Đăng ký</div>
				<form onSubmit={handleSubmit(onSubmit)} className='register__form'>
					<div className='register__item'>
						<label className='register__label' htmlFor='name'>
							Họ tên
						</label>
						<input
							className='register__input'
							name='name'
							{...register('name', { required: true })}
							type='text'
						/>
						<ErrorMessage
							errors={errors}
							name='name'
							render={() => (
								<span className='register__error'>{errors.name?.message}</span>
							)}
						/>
					</div>
					<div className='register__item'>
						<label className='register__label' htmlFor='username'>
							Tên đăng nhập
						</label>
						<input
							className='register__input'
							name='username'
							{...register('username', { required: true })}
							type='text'
						/>
						<ErrorMessage
							errors={errors}
							name='username'
							render={() => (
								<span className='register__error'>{errors.username?.message}</span>
							)}
						/>
					</div>

					<div className='register__item'>
						<label className='register__label' htmlFor='password'>
							Mật khẩu
						</label>
						<input
							className='register__input'
							name='password'
							type='password'
							{...register('password', { required: true })}
						/>
						<ErrorMessage
							errors={errors}
							name='password'
							render={() => (
								<span className='register__error'>{errors.password?.message}</span>
							)}
						/>
					</div>
					<div className='register__item'>
						<label className='register__label' htmlFor='confirmPassword'>
							Xác nhận mật khẩu
						</label>
						<input
							className='register__input'
							name='confirmPassword'
							type='password'
							{...register('confirmPassword', { required: true })}
						/>
						<ErrorMessage
							errors={errors}
							name='confirmPassword'
							render={() => (
								<span className='register__error'>
									{errors.confirmPassword?.message}
								</span>
							)}
						/>
					</div>
					{error && <span className='register__error'>{error}</span>}
					<div className='register__bottom '>
						<button className='btn__register ' type='submit'>
							Đăng ký
						</button>
					</div>
					<div className='register__loading'>{loading && <CLoading />}</div>
				</form>
			</div>
		</div>
	)
}

export default CRegister
