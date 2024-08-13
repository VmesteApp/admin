import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import { setupStore } from './store/index.ts'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

const store = setupStore()
const root = createRoot(document.getElementById('root'))
root.render(
	<Provider store={store}>
		<App />
	</Provider>
)
