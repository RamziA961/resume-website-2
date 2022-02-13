import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material"
import { DiJava, DiJavascript1, DiPython, DiSqllite, DiSwift } from 'react-icons/di'
import { FiMoreHorizontal } from 'react-icons/fi'
import { SiAmazonaws, SiC, SiCplusplus, SiFirebase, SiGit, SiGooglecloud, SiJquery, SiMongodb, SiMysql, SiNginx, SiR, SiReact, SiTypescript, SiXcode } from 'react-icons/si'
import { Avatar, Chip, Divider, Grid, IconButton, Paper, Slide, Stack, SxProps, Theme, Typography, Zoom } from "@mui/material"
import React, { useEffect, useRef, useState } from "react"

import { AppState, DispatchAction, DispatchActionType } from "../reducers/Reducer"
import BackGroundIcon from "./BackgroudIcon"
import BackGroudText from "./BackgroundText"


const ProfileSummary: React.FC<{
    state: AppState, 
	dispatch: React.Dispatch<DispatchActionType>
}> = (props) : JSX.Element => {
    
    const { state, dispatch } = props 

    const container = useRef(null)
    const [ imgRendered, setRendered ] = useState(false)
   
    useEffect(()=>{

    }, [container])

    return (
        <Stack 
			direction = 'row' 
			height = '50%' 
            width = '100%'
			px={5} 
            alignItems = 'center'
			divider = {<Divider 
				orientation = 'vertical' 
				variant = 'middle'
				sx = {{height: '50%', alignSelf: 'center'}} 
				flexItem
			/>} 
			spacing = {5}
		>
            <Zoom in 
                addEndListener = {() => setTimeout(() => setRendered(true), 500)}
            >
                <Stack justifyContent= 'center' alignItems = 'center' spacing = {0} color = 'text.primary'>
                    <Avatar 
			        	variant = 'rounded'
			        	alt = 'Ramzi Abou Chahine'
			        	src = '/snapshot.png'
			        	sx = {{
                            width: '10rem', 
                            height: '10rem', 
                            justifySelf: 'center', 
                            alignSelf: 'center',
                        }}
			        >
			        	RA
			        </Avatar>
                    <Typography variant = 'overline' py = {0}>
                        Ramzi Abou Chahine
                    </Typography>
                    <Typography variant = 'caption' py = {0}>
                        ramziachahine@pm.me
                    </Typography>
                </Stack>
                
            </Zoom>
			<Stack 
                justifyContent = 'center' 
                color = 'text.primary'
                ref = {container} 
                width = '100%'
            >
                <Slide 
                    in = {imgRendered} 
                    direction = 'right' 
                    container = {container.current}
                >
                    <Stack>
                        <ProfilePageManager {...props}/>
                    </Stack>
                </Slide>
			</Stack>
            
            <Stack justifyContent = 'center'>
                {state.home.currPage === 1 ?
                    <IconButton disabled>
                        <KeyboardArrowUp/>
                    </IconButton>
                :
                    <IconButton onClick={() => dispatch(DispatchAction('SET_CURR_HOME_PAGE', {
                        currPage: state.home.currPage - 1
                    }))}>
                        <KeyboardArrowUp/>
                    </IconButton>
                }
                {state.home.currPage === state.home.numPages ?
                    <IconButton disabled>
                        <KeyboardArrowDown/>
                    </IconButton>
                :
                    <IconButton onClick={() => dispatch(DispatchAction('SET_CURR_HOME_PAGE', { 
                        currPage: state.home.currPage + 1
                    }))}>
                        <KeyboardArrowDown/>
                    </IconButton>
                }
            </Stack>
        </Stack>
    )
}

const ProfilePageManager : React.FC<{
    state: AppState, 
	dispatch: React.Dispatch<DispatchActionType>
}> = (props) : JSX.Element => {
    const { state, dispatch } = props
    
    const pages : {[page: number]: JSX.Element} = {
        1: <ProfilePageOne {...props} />,
        2: <ProfilePageTwo {...props}/>,
        3: <ProfilePageThree {...props}/>
    }

    return pages[state.home.currPage]
}

const ProfilePageOne : React.FC<{
    state: AppState, 
	dispatch: React.Dispatch<DispatchActionType>
}> = (props) => {

    return (
        <Slide direction = {props.state.home.animationDir} in>
            <Stack spacing = { 1 }>
                <Paper elevation={16} style = {{padding: 4, width: 'max-content'}}>
			        <Typography variant = 'button'>
			        	Software Engineer &amp; Informatics Researcher 
			        </Typography>
			        <Typography variant = 'subtitle2'>
			        	BSc Computer Science
			        </Typography>
                </Paper>
                <Paper elevation={16} style = {{padding: 4, width: '100%'}}>
                    <Typography variant = 'body1'>
                    I am a recent San Francisco State University Computer Science graduate, earning my 
                    diploma with high distinction; soon to be a graduate student pursuing a MSc in 
                    Advanced Computing. I am currently seeking new opportunities to kickstart my career.
                    I have experience developing software from the kernel-level to the cloud. I am well-versed
                    in serveral programming languages and proficient in several frameworks and tools. 
                    I also engage in academic research with teams from various institutions, primarily 
                    on Human-Computer interaction with papers in the pipeline pending publishing.
                    If you are looking for someone with my skillset, please do not hesitate to reach out.
                    </Typography>
                </Paper>
                <Stack pt = {1} width = '100%' direction = 'row' justifyContent = 'space-between'>
                    <Chip label = 'Algorithms' color = 'primary'/>
                    <Chip label = 'Artificial Intelligence' color = 'primary'/>
                    <Chip label = 'Computer Networks' color = 'primary'/>
                    <Chip label = 'Cybersecurity' color = 'primary'/>
                    <Chip label = 'Databases' color = 'primary'/>
                    <Chip label = 'Operating Systems' color = 'primary'/>
                    <Chip label = 'Web Development' color = 'primary'/>

                </Stack>
            </Stack>
        </Slide>
    )
}

const ProfilePageTwo : React.FC<{
    state: AppState, 
	dispatch: React.Dispatch<DispatchActionType>
}> = (props): JSX.Element => {

    const iconSize = 48
    const elevation = 16
    const iconStyle : React.CSSProperties = {
        padding: 3
    }

    return (
        <Slide direction = {props.state.home.animationDir} in>
            <Stack spacing = { 5 }>

                <Divider variant = 'middle'>
                    <Typography variant = 'overline'>
                        Programming Languages
                    </Typography>
                </Divider>

                <Stack spacing = { 2 } direction = 'row' display = 'flex' justifyContent = 'space-between'>
                    <BackGroundIcon title = 'C' placement = 'top' elevation={elevation}>
                        <SiC size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'C Plus Plus' placement = 'top' elevation={elevation}>
                        <SiCplusplus size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'Java' placement = 'top' elevation={elevation}>
                        <DiJava size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'Javascript' placement = 'top' elevation={elevation}>
                        <DiJavascript1 size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'Python' placement = 'top' elevation={elevation}>
                        <DiPython size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'Swift' placement = 'top' elevation={elevation}>
                        <DiSwift size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'Typescript' placement = 'top' elevation={elevation}>
                        <SiTypescript size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'And More...' placement = 'top' elevation={elevation}>
                        <FiMoreHorizontal size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                </Stack>

                <Divider variant = 'middle'>
                    <Typography variant = 'overline'>
                        Tools &amp; Frameworks
                    </Typography>
                </Divider>

                <Stack
                    spacing = { 2 }
                    direction = 'row' 
                    display = 'flex' 
                    justifyContent = 'space-between'
                >
                <BackGroundIcon title = 'Amazon Web Services' placement = 'bottom' elevation={elevation}>
                        <SiAmazonaws size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'Firebase' placement = 'bottom' elevation={elevation}>
                        <SiFirebase size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'Git' placement = 'bottom' elevation={elevation}>
                        <SiGit size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'Google Cloud Platform' placement = 'bottom' elevation={elevation}>
                        <SiGooglecloud size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'JQuery' placement = 'bottom' elevation={elevation}>
                        <SiJquery size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'MongoDB' placement = 'bottom' elevation={elevation}>
                        <SiMongodb size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'MySQL' placement = 'bottom' elevation={elevation}>
                        <SiMysql size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'NGINX' placement = 'bottom' elevation={elevation}>
                        <SiNginx size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'R Programming Language' placement = 'bottom' elevation={elevation}>
                        <SiR size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'React' placement = 'bottom' elevation={elevation}>
                        <SiReact size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'SQLite' placement = 'bottom' elevation={elevation}>
                        <DiSqllite size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'XCode' placement = 'bottom' elevation={elevation}>
                        <SiXcode size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                    <BackGroundIcon title = 'And More...' placement = 'bottom' elevation={elevation}>
                        <FiMoreHorizontal size = {iconSize} style = {iconStyle}/>
                    </BackGroundIcon>
                </Stack>
            </Stack>
        </Slide>   
    )
}

const ProfilePageThree : React.FC<{
    state: AppState, 
	dispatch: React.Dispatch<DispatchActionType>
}>= (props) => {
    const { state, dispatch } = props
    const variant = 'body2'
    const elevation = 16

    const paperStyle: SxProps<Theme> = {
        padding: 1
    }

    return (
        <Slide direction = {props.state.home.animationDir} in>
            <Stack spacing = { 2 }>
                <Divider variant = 'middle'>
                    <Typography variant = 'overline'>
                        Languages
                    </Typography> 
                </Divider>

                <Grid container spacing = {2} pb = {2} direction = 'row'>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            English - Bilingual
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Arabic - Bilingual
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            French - Work Proficiency
                        </BackGroudText>
                    </Grid>
                </Grid>

                <Divider variant = 'middle'>
                    <Typography variant = 'overline'>
                        Traits
                    </Typography> 
                </Divider>

                <Grid container spacing = { 2 } direction = 'row' flexWrap = 'wrap'>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Analytical
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Articulate
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Attentive
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Confident
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Diligent
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Knowledgable
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Outspoken
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Passionate
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Principled
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Strategic
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Studious
                        </BackGroudText>
                    </Grid>
                    <Grid item>
                        <BackGroudText elevation = {elevation} style = {paperStyle} variant = {variant}>
                            Team-Oriented
                        </BackGroudText>
                    </Grid>
                </Grid>
            </Stack>
        </Slide>
    )
}


export default ProfileSummary