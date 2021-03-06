import { Mail, GitHub, LinkedIn, Code } from "@mui/icons-material"
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab"
import { Typography } from "@mui/material"
import ReactGA from 'react-ga'

import { AppState, DispatchActionType } from "../reducers/Reducer"


const ContactInfo : React.FC<{
	state: AppState, 
	dispatch: React.Dispatch<DispatchActionType>
}> = (props) => {

	const { state, dispatch } = props

	const onClick = (name: string, address: string) => {
		ReactGA.event({
			category: 'Referral',
			label: name,
			action: `Linked to ${name} from home page.`
		})

		window.open(address, '_blank', 'noopener noreferrer')
	}

	const treeDotStyle : React.CSSProperties = {
		cursor: 'pointer'
	}

	return (
		<Timeline position="left">
			<TimelineItem>
				<TimelineSeparator>
			  		<TimelineConnector sx = {{bgcolor: state.palette === 'light' ? 'grey.700' : 'grey'}}/>
			  		<TimelineDot sx = {{bgcolor: state.palette === 'light' ? 'grey.700' : 'grey'}}>
				  		<Mail
						  	sx = {{color: 'background.default'}}
						  	style = {treeDotStyle}
							onClick = {() => onClick('Email', 'mailto:ramziachahine@pm.me')}
						/>
			 	 	</TimelineDot>
			  		<TimelineConnector sx = {{bgcolor: 'primary.dark'}}/>
				</TimelineSeparator>
				<TimelineContent sx={{ py: '22px', px: 2 }}>
					<Typography variant = 'caption' color = 'text.primary' component="span">
						Email
					</Typography>
				</TimelineContent>
			</TimelineItem>
		  	<TimelineItem>
				<TimelineSeparator>
			  		<TimelineConnector sx = {{bgcolor: 'primary.dark'}}/>
			  		<TimelineDot variant = 'filled' sx = {{bgcolor: 'primary.dark'}}>  
						<GitHub
							sx = {{color: 'background.default'}}
							style = {treeDotStyle}
							onClick = {() => onClick('GitHub', 'https://github.com/RamziA961')} 
						/>
			  		</TimelineDot>
			  		<TimelineConnector sx = {{bgcolor: 'primary.main'}}/>
				</TimelineSeparator>
				<TimelineContent sx={{ py: '22px', px: 2 }}>
					<Typography variant = 'caption' color = 'text.primary' component="span">
						GitHub
					</Typography>
				</TimelineContent>
		  	</TimelineItem>
		  	<TimelineItem>
				<TimelineSeparator>
				  	<TimelineConnector sx = {{bgcolor: 'primary.main'}} />
				  	<TimelineDot color='primary' variant='filled'>
						<LinkedIn 
							style = {treeDotStyle}
							onClick = {() => onClick('LinkedIn Profile', 'https://www.linkedin.com/in/ramzi-a-9b890b194/')}
						/>
				  	</TimelineDot>
				  	<TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
				</TimelineSeparator>
				<TimelineContent sx={{ py: '22px', px: 2 }}>
					<Typography variant = 'caption' color = 'text.primary' component="span">
						LinkedIn
					</Typography>
				</TimelineContent>
		  	</TimelineItem>
		  	<TimelineItem>
				<TimelineSeparator>
			  		<TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
			  		<TimelineDot color="secondary">
						<Code
							style = {treeDotStyle}
							onClick = {() => onClick('Source Code', 'https://github.com/RamziA961/resume-website-2')}
						/>
			  		</TimelineDot>
			  		<TimelineConnector />
				</TimelineSeparator>
				<TimelineContent sx={{ py: '12px', px: 2 }}>
					<Typography variant = 'caption' color = 'text.primary' component="span">
						Source Code
					</Typography>
				</TimelineContent>
		  	</TimelineItem>
		</Timeline>
	)
}

export default ContactInfo