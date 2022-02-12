import { Fragment, useEffect, useState } from 'react'
import { Divider, LinearProgress, Stack, Typography } from '@mui/material'
import axios from 'axios'

import ProjectCard, { ProjectCardType } from "../components/ProjectCard"
import { AppState, DispatchAction, DispatchActionType } from '../reducers/Reducer'


const Projects : React.FC<{
    state: AppState, 
    dispatch: React.Dispatch<DispatchActionType>
}> = (props): JSX.Element => {
    
    const { state, dispatch } = props

    const [entries, setEntries] = useState<undefined | {[year : string]: ProjectCardType[]}>(state.projects)
    const [progress, setProgress] = useState(!entries ? 0 : 100)
    const [color, setColor] = useState<'primary' | 'error'>('primary')

    useEffect(() => {
        (async () => {
            try {
                const res = await axios({
                    url: '/projects.json',
                    method: 'GET',
                    responseType: 'json',
                    onDownloadProgress: (e) => {
                        if(e.lengthComputable)
                            setProgress(Math.round((e.loaded / e.total)) * 100)
                    },
                })
               
                dispatch(DispatchAction('SET_PROJECTS', res.data))
                setEntries(res.data)
                setProgress(100)
            } catch(err) {
                setColor('error')
            }
        })()
    }, [])


    return <Stack  spacing = {2} width = '100%'>
        <LinearProgress 
                    variant = 'determinate' 
                    color = {color}
                    value = {progress}
                /> 
        {!entries ?
            undefined
        :   
            Object.keys(entries).map(year => 
                <Fragment key = {year}>
                    <Divider>
                        <Typography variant = 'subtitle1' color = 'text.primary'>
                            {year}
                        </Typography>
                    </Divider>
                    {entries[year].map(pub =>
                        <ProjectCard
                            key = {pub.title}
                            {...pub}
                        />
                    )}
                </Fragment>
            )
        }     
    </Stack>
}

export default Projects