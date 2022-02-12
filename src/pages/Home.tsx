import React, { useEffect } from 'react'
import { Box, Paper, Stack, Typography } from '@mui/material'

import { AppState, DispatchAction, DispatchActionType } from '../reducers/Reducer'
import ParticlesContainer from '../components/Particles'
import ProfileSummary from '../components/ProfileSummary'
import ContactInfo from '../components/ContactInfo'

const Home: React.FC<{
	state: AppState, 
	dispatch: React.Dispatch<DispatchActionType>
}> = (props): JSX.Element => {
	const { state, dispatch } = props

	useEffect(() => {
		dispatch(DispatchAction('SET_ON_HOME_PAGE', {
			onPage: true
		}))

		return () => dispatch(DispatchAction('SET_ON_HOME_PAGE', {
			onPage: false
		}))
	}, [])

	return (
		<Stack
			display = 'flex' 
			width = '100%' 
			height = '100%'
			mt = {3}
		>
			<Stack direction='row' height = '40%' alignItems = 'center'>
				<Stack width = '100%' height= '100%'>
					<ParticlesContainer/>
				</Stack>
				<Stack
					alignItems = 'center'
				>
					<ContactInfo {...props}/>
				</Stack>
			</Stack>
			<ProfileSummary {...props}/>
		</Stack>
	)
}


const IconItem : React.FC<{
	icon: React.ReactNode
	children: React.ReactNode
}> = ({icon, children}) => { 
	return <Paper elevation={3} sx = {{width: '15rem', height: '6rem'}}>
		<Box 
			display = 'flex' 
			flexDirection = 'column' 
			justifyContent = 'center' 
			alignItems = 'center'
			padding={2}
		>
			{icon}
			<Typography align = 'center' variant='subtitle1'>
				{children}
			</Typography>
		</Box>
	</Paper>
}

export default Home