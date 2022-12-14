import './style.css'

import { logout } from 'apis/auth.api'
import CLoading from 'common/components/CLoading'
import MUserList from 'modules/btcn05_libraries/components/MUserList'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function getUserData() {
	return JSON.parse(localStorage.getItem('user'))
}
function MHome() {
	const [user, setUser] = useState()
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setUser(getUserData())
	}, [])

	const handleLogout = async () => {
		setIsLoading(true)
		const res = await logout()
		if (res.data) {
			setUser({})
			setIsLoading(false)
		}
	}

	return (
		<div className='libraries__body'>
			<div>
				<Link to='/'>Back to Home</Link>
				<h1>Apply Front-end Libraries</h1>
			</div>
			{user?.user ? (
				<>
					<div className='welcome'>
						<h1>Hello {user.user}</h1>
						<button onClick={handleLogout}>Đăng xuất</button>
						{isLoading && <CLoading />}
					</div>
					<div className='user__container'>
						<span>
							Fetch user list with react-query (try catching by click Back to home and
							then choose BTCN05)
						</span>
						<span>
							Click a row in table to fetch user detail (username) (try catching by
							click different rows)
						</span>
						<div>{true && <MUserList />}</div>
					</div>
				</>
			) : (
				<div className='libraries__btn'>
					<Link to='login'>
						<button className='btn__login'>Đăng nhập</button>
					</Link>
					<Link to='register'>
						<button className='btn__register'>Đăng ký</button>
					</Link>
				</div>
			)}
		</div>
	)
}

export default MHome
