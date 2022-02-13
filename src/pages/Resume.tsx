import { useEffect, useRef, useState } from 'react'
import { Box, LinearProgress, Slide } from '@mui/material'
import axios from 'axios'
import ReactGA from 'react-ga'

import { AppState, DispatchAction, DispatchActionType } from '../reducers/Reducer'

const Resume : React.FC<{
    state: AppState, 
    dispatch: React.Dispatch<DispatchActionType>
}> = (props): JSX.Element => {
    const { state, dispatch } = props

    const [content, setContent] = useState<undefined | string>(state.resume)
    const [progress, setProgress] = useState(!content ? 0 : 100)
    const [color, setColor] = useState<'primary' | 'error'>('primary')

    const container = useRef(null)
    
    useEffect(() => {
        if(!content) {
            (async () => {
                try {
                    const res = await axios({
                        url: '/Resume.pdf',
                        responseType: 'blob',
                        onDownloadProgress: (e) => {
                            setProgress(Math.round((e.loaded / e.total)) * 100)
                        }
                    })

                    const url = URL.createObjectURL(res.data)

                    setContent(url)
                    dispatch(DispatchAction('SET_RESUME', {'resume': url}))

                } catch(err) {
                    setColor('error')
                }
            })()
        }
    })

    useEffect(() => {
        const start = Date.now()
        
        return () => ReactGA.event({
            category: 'User Engagement',
            label: 'Resume',
            action: 'Duration of Interaction (Minutes)',
            value: Math.round((Date.now() - start) / (60 * 1000))
        })
    })

    return (
        <Box
            ref = {container}
            sx = {{height: '100%', width: '100%'}}
        >   
            <LinearProgress variant = 'determinate' value = {progress} color = {color}/>
            {!content ? 
                null
            :
                <Slide direction = 'up' in = {true}  container = {container.current}>
                    <iframe
                        title = 'Resume PDF'
                        style={{
                            border: 0,
                            borderRadius: '.2rem',
                            marginTop: '.5rem',
                            height: '100%',
                            width: '100%'
                        }}
                        src = {content}
                    />
                </Slide>
            }
        </Box>
    )
}

export default Resume