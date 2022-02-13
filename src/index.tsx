import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import './index.css';
import App from './App'
import { ColorModeProvider } from './contexts/ColorModeContext'


import reportWebVitals from './reportWebVitals'

ReactGA.initialize('UA-197112302-1', {alwaysSendToDefaultTracker: true})

ReactDOM.render(
	<React.StrictMode>
		<ColorModeProvider>
			<App/>
		</ColorModeProvider>
	</React.StrictMode>,
	document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
