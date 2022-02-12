import { Mail, GitHub, LinkedIn, Code } from "@mui/icons-material"
import { Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineSeparator } from "@mui/lab"
import { Typography } from "@mui/material"
import { AppState, DispatchActionType } from "../reducers/Reducer"


const ContactInfo : React.FC<{
	state: AppState, 
	dispatch: React.Dispatch<DispatchActionType>
}> = (props) => {

	const { state, dispatch } = props

	const onClick = (address: string) => {
		window.location.href = address
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
							onClick = {() => onClick('mailto:ramziachahine@pm.me')}
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
							onClick = {() => onClick('https://github.com/RamziA961')} 
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
							onClick = {() => onClick('https://www.linkedin.com/in/ramzi-a-9b890b194/')}
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
							onClick = {() => onClick('')}
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