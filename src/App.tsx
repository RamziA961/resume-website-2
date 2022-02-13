import { useReducer, useRef } from 'react'
import { Box, useMediaQuery } from '@mui/material'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Header from './components/Header'
import Home from './pages/Home'
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import Resume from './pages/Resume'

import Reducer, { AppState } from './reducers/Reducer';

const App = (): JSX.Element => {

    const defaultAppState : AppState = {
        palette: useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light',
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
    
    const container = useRef(null)
    const [state, dispatch] = useReducer(Reducer, defaultAppState)
   
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
                    <Route path = 'proj' element = { <Projects state = {state} dispatch = {dispatch}/> }/>
                    <Route path = 'resume' element = { <Resume state = {state} dispatch = {dispatch}/> }/>
                </Routes>
            </BrowserRouter>  
        </Box>    
    )
}

export default App