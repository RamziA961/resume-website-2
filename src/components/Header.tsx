import { Link } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'
import { 
    Box, 
    Button, 
    Divider,
    IconButton, 
    Stack, 
    Tooltip, 
    Typography 
} from "@mui/material"
import { Brightness3, Brightness7 } from '@mui/icons-material'

import { AppState, DispatchAction, DispatchActionType } from '../reducers/Reducer'
import ColorModeContext from '../contexts/ColorModeContext'


const Header : React.FC<{state: AppState, dispatch: React.Dispatch<DispatchActionType>}> = (props): JSX.Element => {

    return (
        <Box 
            display = 'flex' 
            alignItems = 'center'
            mb = '0.25em'
        >
            <Title {...props}/>
            <NavBar {...props}/>
        </Box>
    )
}

const Title : React.FC<{
    state: AppState, 
    dispatch: React.Dispatch<DispatchActionType>
}> = (props): JSX.Element => {
    const { state, dispatch } = props
    const colorContext = useContext(ColorModeContext)

    const handleClick = () => {
        colorContext.toggleColorMode()
        dispatch(DispatchAction('CHANGE_THEME', {}))
    }

    useEffect(() => {
        if(localStorage.getItem('palette') !== state.palette)
            localStorage.setItem('palette', state.palette)
    })

    return (
        <Stack 
            width = '50%'
            direction = 'row'
            spacing = {1}
            alignItems = 'center'
        >
            <Tooltip title = {`Switch to ${state.palette === 'light' ? 'Dark' : 'Light'} Mode`}>
                {state.palette === 'light' ?    
                    <IconButton onClick = {handleClick}>
                        <Brightness3 sx = {{transform: 'rotate(180deg)'}}/>
                    </IconButton>
                    :
                    <IconButton onClick = {handleClick}>
                        <Brightness7 sx = {{transform: 'rotate(180deg)'}}/>
                    </IconButton>
                }
            </Tooltip>

            <Typography variant="h6" color = {"primary"}>
                Ramzi Abou Chahine
            </Typography>
        </Stack>
    )    
}


// const Title = (): JSX.Element => {
//     const [cardParent, setCardParent] = useState<null | HTMLElement>(null)

//     const renderCard = (event : React.MouseEvent<HTMLElement>) => 
//         setCardParent(event.currentTarget)

//     const close = () => setCardParent(null)

//     return (
//         <>
//                 <Stack 
//                     width = '50%'
//                     direction = 'row'
//                     spacing = {1}
//                     alignItems = 'center'
//                 >
//                     <Tooltip title = 'Contact Details'>
//                         <IconButton onClick = {renderCard}>
//                             <Avatar
//                                 sx = {{height: 28, width: 28}}
//                             > 
//                                 RA
//                             </Avatar>
//                         </IconButton>
//                     </Tooltip>
//                     <Typography variant="h6" color = {"primary"}>
//                         Ramzi Abou Chahine
//                     </Typography>
//                 </Stack>
//             <Menu
//                 anchorEl = {cardParent}
//                 open = {cardParent instanceof HTMLElement}
//                 onClose = {close}
//             >
//                 <TitleMenuItem icon = {<GitHub/>} title = 'GitHub Profile' link = 'https://github.com/RamziA961'/>
//                 <TitleMenuItem icon = {<Mail/>} title = 'Email' link = 'mailto:ramziachahine@pm.me'/>
//                 <TitleMenuItem icon = {<Code/>} title = 'Source Code' link = 'https://github.com/RamziA961'/>
//         </Menu>
//     </>
//     )
// }

const NavBar : React.FC<{
    state: AppState, 
    dispatch: React.Dispatch<DispatchActionType>    
}> = (props): JSX.Element => {

    const { state, dispatch } = props

    const [active, setActive] = useState(
        window.location.pathname || window.location.pathname.at(0) === '/' ? 
        window.location.pathname.slice(1) 
        : 
        window.location.pathname
    )

    return (
        <Stack 
            direction = 'row'
            spacing = {1} 
            justifyContent = 'flex-end'
            divider={<Divider
                orientation = "vertical"
                flexItem
            />}
            width = '50%'
        >   
        {state.routes.map(route =>
            active === route.path ?
                    <Link key = {route.title} to = {route.path}>
                        <Button  variant = 'contained'>
                            {route.title}
                        </Button>
                    </Link>
                :   
                    <Link key = {route.title} to = {route.path} onClick={() => setActive(route.path)}>
                        <Button >
                            {route.title}
                        </Button>
                    </Link>       
        )}
        </Stack>
    )
}


// const TitleMenuItem = (props: {
//     title: string,
//     link: string,
//     icon: React.ReactElement
// }): JSX.Element => {

//     const textStyle = {
//         color: 'unset',
//         textDecoration: 'none'
//     }

//     return <a 
//         style = {textStyle} 
//         href = {props.link} target="_blank" 
//         rel="noopener noreferrer"
//     >
//         <MenuItem>
//             <ListItemIcon>
//                 {props.icon}
//             </ListItemIcon>
//             {props.title}
//         </MenuItem>
//     </a>
// }

export default Header