import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
//import { ThemeProvider } from './context/themeContext.tsx'

const rootElement = document.getElementById('root')
if (rootElement) {
	const root = createRoot(rootElement)
	root.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	)
} else {
	console.error('Element with id "root" not found!')
}
