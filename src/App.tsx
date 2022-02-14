import { useMemo, useReducer, useRef } from 'react'
import { Box } from '@mui/material'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';
import ReactGA from 'react-ga'


import Header from './components/Header'
import Home from './pages/Home'
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import Resume from './pages/Resume'

import Reducer, { AppState } from './reducers/Reducer';

const Initializer : React.FC<{}> = (props) => {

    const defaultAppState : AppState = {
        palette: !localStorage.getItem('palette') ? 'light' : localStorage.getItem('palette') as 'dark' | 'light',
        routes: [
            {title: 'Home', path: ''},
            {title: 'Publications', path: 'pub'},
            {title: 'Projects', path: 'proj'},
            {title: 'Resume', path: 'resume'}
        ],
        home: {
            currPage: 1,
            numPages: 3,
            onPage: false,
            animationDir: 'up'
        }
    }

    return (
        <App initialState = {defaultAppState}/>
    )
}

const App : React.FC<{
    initialState: AppState
}> = (props): JSX.Element => {
    
    const { initialState } = props

    const container = useRef(null)
    const [state, dispatch] = useReducer(Reducer, initialState)

    useMemo(() => {
        const title = state.routes.find(val => `/${val.path}` === window.location.pathname)?.title
        const path = !window.location.pathname ? '/' : window.location.pathname
        const search = window.location.search
        
        ReactGA.pageview(
            search ? `${path}${search}` : path,
            undefined,
            title
        )
    }, [window.location.pathname])

    useMemo(() => {
        const start = Date.now()

        window.onbeforeunload = () => {
            ReactGA.event({
                category: 'User Engagement',
                label: 'Web Application',
                action: 'Duration of Interaction (Minutes)',
                value: Math.round((Date.now() - start) / (60 * 1000))
            })
        }
    }, [])
    
    return (
        <Box 
            bgcolor = 'background.default' 
            sx = {{position: 'relative', height: '100%', width: '100%'}}
            ref = {container}
        >
            <BrowserRouter>
                <Header state = {state} dispatch = {dispatch}/>
                <Routes>
                    <Route path = '/' element = { <Home state = {state} dispatch = {dispatch}/> }/>
                    <Route path = 'pub' element = { <Publications state = {state} dispatch = {dispatch}/> }/>
                    {/* <Route path = 'pub/:pubId' element = {<PublicationViewer state = {state} dispatch = { dispatch }/>}/>  */}
                    <Route path = 'proj' element = { <Projects state = {state} dispatch = {dispatch}/> }/>
                    <Route path = 'resume' element = { <Resume state = {state} dispatch = {dispatch}/> }/>
                    <Route path = '*' element = {<Navigate to = '/'/>}/>
                </Routes>
            </BrowserRouter>  
        </Box>    
    )
}

export default Initializer