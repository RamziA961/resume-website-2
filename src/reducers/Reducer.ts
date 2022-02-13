import { ProjectCardType } from "../components/ProjectCard"
import { PublicationCardType } from "../components/PublicationCard"

export type AppState = {
    palette: 'light' | 'dark',
    routes: { title: string, path: string }[],
    resume?: string,
    projects?: {[year: string]: ProjectCardType[]},
    publications?: {[year: string]: PublicationCardType[]},
    home: {
        currPage: number,
        numPages: number,
        onPage: boolean,
        animationDir: 'up' | 'down',
        profileImage?: string
    }
}

export type DispatchOperationType = 
    'CHANGE_THEME' | 
    'SET_RESUME' | 
    'SET_PUBLICATIONS' | 
    'SET_PROJECTS' | 
    'SET_PROFILE_PAGE' |
    'SET_CURR_HOME_PAGE' |
    'SET_ON_HOME_PAGE' |
    'SET_ANIM_DIR' |
    'SET_PROFILE_IMAGE'

export type DispatchActionType = {
    type?: DispatchOperationType
    payload?: DispatchArgs
}

export type DispatchArgs = {
    [key: string]: any
}

export const DispatchAction = (type : DispatchOperationType, payload?: DispatchArgs) => {
    return {
        type,
        payload
    }
}

const Reducer = (state: AppState , action : DispatchActionType) : AppState => {
    const { type, payload } = action
    
    const newState = (() => {
        switch(type) {
            case 'CHANGE_THEME': {
                let newState = {...state}
                newState.palette = newState.palette === 'dark' ? 'light' : 'dark'
                return newState
            }
            case 'SET_RESUME': {
                let newState = {...state}

                if(payload && payload['resume'] && typeof payload['resume'] === 'string')
                    newState.resume = payload['resume']

                return newState
            }
            case 'SET_PUBLICATIONS': {
                let newState = {...state}

                if(payload && payload['publications'])
                    newState.publications = payload['publications']
                
                return newState
            }
            case 'SET_PROJECTS': {
                let newState = {...state}

                if(payload && payload['projects'])
                    newState.publications = payload['projects']
                
                return newState
            }
            case 'SET_CURR_HOME_PAGE' : {
                let newState = {...state}
                const curr = state.home.currPage

                if(payload && payload['currPage'] && typeof payload['currPage'] === 'number')
                    newState.home.currPage = payload['currPage']
                
                if(curr > newState.home.currPage) {
                    newState.home.animationDir = 'down'
                } else {
                    newState.home.animationDir = 'up'
                }
                
                return newState
            }
            case 'SET_ON_HOME_PAGE': {
                let newState = {...state}
                
                if(payload && payload['onPage'] && typeof payload['onPage'] === 'boolean')
                    newState.home.onPage = payload['onPage']

                return newState
            }
            case 'SET_ANIM_DIR': {
                let newState = {...state}

                if (payload && payload['animationDir'] && 
                    (payload['animationDir'] === 'up' || payload['animationDir'] === 'down'))
                    newState.home.animationDir = payload['animationDir']

                return newState
            }
            case 'SET_PROFILE_IMAGE': {
                let newState = {...state}

                if (payload && payload['profileImage'] && typeof payload['profileImage'] === 'string')
                    newState.home.profileImage = payload['profileImage']

                return newState
            }
            default: 
                return state
        }
    })()

    return newState
}

export default Reducer