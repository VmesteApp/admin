import AuthDark from './authDark'
import AuthLight from './authLight'

const Auth = () => {
	if (localStorage.getItem('theme') == 'light') return <AuthLight />
	else return <AuthDark />
}

export default Auth
