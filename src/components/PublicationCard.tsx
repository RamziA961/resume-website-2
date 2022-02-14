import { Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { Article, ArticleOutlined, ExpandMore, Link, LinkOff } from '@mui/icons-material'

import Expand from './Expand'
import React, { useState } from "react"
import PublicationModal from "./PublicationModal"
import { AppState, DispatchActionType } from "../reducers/Reducer"

export type PublicationCardType = {
    title: string,
    authors: string[],
    link: string,
    linkExt: string
    description: string,
    verbose?: string[],
    start: string,
    end: string,
    publisher: string,
}

const PublicationCard: React.FC<
    PublicationCardType & {
        state: AppState,
        dispatch: React.Dispatch<DispatchActionType>
    }
> = (props): JSX.Element => {

    const [ isExpanded, setExpanded ] = useState(false)

    return <Card sx={{width: '100%'}}>
        <CardHeader
            title = {props.title}
            subheader = {props.authors.join(', ')}
            action = { <ActionArea {...props} />}
        />
        <CardContent>
            <Stack display = 'flex' width = '100%' justifyContent = 'space-between' direction = 'row'>
                <Typography variant = 'overline'>
                    {`${props.start} - ${props.end}`}
                </Typography>
                <Typography variant = 'overline'>
                    Publisher: {props.publisher}
                </Typography>
            </Stack>
            <Typography variant = 'body2' color = 'text.secondary'>
                {props.description}
            </Typography>
        </CardContent>
        {props.verbose !== undefined && props.verbose.length !== 0 ? 
            <>
                <CardActions>
                    <Expand expanded = {isExpanded} onClick = {() => setExpanded(!isExpanded)}>
                        <ExpandMore/>
                    </Expand>
                </CardActions>
                <Collapse in = {isExpanded} unmountOnExit>
                    <CardContent>
                        <Stack>
                            {props.verbose?.map((paragraph, i) => 
                                <Typography align = 'left' key = {i} paragraph>
                                    {paragraph}
                                </Typography>    
                            )}
                        </Stack>
                    </CardContent>
                </Collapse>
            </>
            :
            undefined // do nothing
        }
    </Card>
}

const ActionArea : React.FC<
    PublicationCardType & {
        state: AppState,
        dispatch: React.Dispatch<DispatchActionType>,
    }
> = (props) => {
    const [ modalState, setModalState ] = useState(false)

    return <Stack direction = 'row' spacing = {0.5}>
        {props.link === '' ?
            <Tooltip title = 'Local Access Unavailable'>
                <IconButton onClick = {() => setModalState(!modalState)}> 
                    <ArticleOutlined/>
                </IconButton>
            </Tooltip> 
        :
            <>
                <Tooltip title = 'Access Locally'>
                    <IconButton onClick = {() => setModalState(!modalState)}> 
                        <Article/>
                    </IconButton>
                </Tooltip> 
                <PublicationModal
                    state = { props.state } 
                    dispatch = { props.dispatch } 
                    publicationID = { props.link }
                    open = { modalState }
                    setOpen = { setModalState }
                />
            </>
        }

        {props.linkExt === '' ? 
            <Tooltip title = 'Currently Unavailable'>
                <IconButton>
                    <LinkOff />
                </IconButton>
            </Tooltip>
        :  
            <Tooltip title = {`${new URL(props.linkExt).hostname}`}>
                <IconButton href = {props.link} target = '_blank'  rel = 'noreferrer noopener'>         
                    <Link/>
                </IconButton>
            </Tooltip>
        }
    </Stack>

}

export default PublicationCard
