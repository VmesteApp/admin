import Auth from '../pages/auth'

const ThemeSwitcher = () => {
	if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'light')

	if (localStorage.getItem('theme') == 'light')
		localStorage.setItem('theme', 'dark')
	else localStorage.setItem('theme', 'light')
	window.location.reload()
}

export default ThemeSwitcher
