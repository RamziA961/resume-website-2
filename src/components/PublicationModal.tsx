import { Dialog, LinearProgress, Skeleton, Stack } from "@mui/material"
import { AppState, DispatchAction, DispatchActionType } from "../reducers/Reducer"
import React, { useEffect, useState } from "react"
import axios from "axios"


const PublicationModal : React.FC<{
    state: AppState,
    dispatch: React.Dispatch<DispatchActionType>,
    publicationID: string,
    open: boolean
    setOpen : (state: boolean) => void
}> = (props): JSX.Element => {

    const { state, dispatch, publicationID } = props
    const [ content, setContent ] = useState(state.publicationPaths?.pubId)
    const [ progress, setProgress ] = useState(!content ? 0 : 100)
    const [ color, setColor ] = useState<'primary' | 'error'>('primary')
    

    const modalStyle = {
        bgcolor: 'background.paper'
    }

    useEffect(() => {
        (async () => {
            try {
                const res = await axios({
                    url: `${publicationID}.pdf`,
                    responseType: 'blob',
                    onDownloadProgress: (e) => {
                        setProgress(Math.round((e.loaded / e.total)) * 100)
                    }
                })

                const url = URL.createObjectURL(res.data)
                
                setContent(url)
                dispatch(DispatchAction('ADD_PUBLICATION_PATH', { pubId: publicationID, path: url }))
                
            } catch(err) {
                setColor('error')
            }
        })()
    }, [])

    return (
        <Dialog
            open = {props.open}
            onClose = {() => props.setOpen(false)}
            onBackdropClick = {() => props.setOpen(false)}
            PaperProps = {{
                sx: {
                    height: '100%'
                }
            }}
            transitionDuration = {800}
            fullWidth
        >
            <Stack height = '100%'>
                <LinearProgress variant = 'determinate' color= {color} value = {progress}/>
                <Stack height = '100%'  >   
                {content ?
                    <iframe src = {content} height = '100%' width = '100%' style={{border: 'none'}}/>
                :
                    <Skeleton height = '100%' variant = 'rectangular' width = '100%'/>
                }
                </Stack>
            </Stack>

        </Dialog>
        
    )

}

export default PublicationModal