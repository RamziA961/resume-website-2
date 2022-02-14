import { Divider, Stack, LinearProgress, Typography, Box } from "@mui/material"
import { useState, useEffect, Fragment } from "react"
import axios from 'axios'

import PublicationCard, { PublicationCardType } from "../components/PublicationCard"
import { AppState, DispatchAction, DispatchActionType } from "../reducers/Reducer"

const Publications : React.FC<{
    state: AppState, 
    dispatch: React.Dispatch<DispatchActionType>,
}> = (props): JSX.Element => {

    const { state, dispatch } = props
    const [entries, setEntries] = useState<undefined | {[year: string]: PublicationCardType[]}>(state.publications)
    const [progress, setProgress] = useState(!state.publications ? 0 : 100)
    
    useEffect(() => {
        if(state.publications === undefined) {
            (async () => {
                const res = await axios({
                    url: '/publications.json',
                    method: 'GET',
                    responseType: 'json',
                    onDownloadProgress: (e) => {
                        setProgress(Math.round((e.loaded / e.total)) * 100)
                    },
                })
                dispatch(DispatchAction('SET_PUBLICATIONS', res.data))
                setEntries(res.data)
            })()
        } else {
            setEntries(state.publications)
        }
        
    }, [])


    return <Stack spacing = {2} width = '100%'>
        <LinearProgress 
                variant = 'determinate' 
                value={progress}
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
                        <PublicationCard
                            key = { pub.title }
                            { ...pub }
                            { ...props } 
                        />
                    )}
                </Fragment>
            )  
        }
    </Stack>
}

export default Publications