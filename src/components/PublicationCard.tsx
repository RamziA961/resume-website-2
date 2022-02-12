import { Card, CardActions, CardContent, CardHeader, Collapse, IconButton, Stack, Tooltip, Typography } from "@mui/material"
import { ExpandMore, Link, LinkOff } from '@mui/icons-material'

import Expand from './Expand'
import { useState } from "react"

export type PublicationCardType = {
    title: string,
    authors: string[],
    link: string,
    description: string,
    verbose?: string[],
    start: string,
    end: string,
    publisher: string
}

const PublicationCard = (props: PublicationCardType) => {
    const [isExpanded, setExpanded] = useState(false)

    return <Card sx={{width: '100%'}}>
        <CardHeader
            title = {props.title}
            subheader = {props.authors.join(', ')}
            action = {props.link === '' ?
                <Tooltip title = 'Currently Unavai'>
                    <IconButton>
                        <LinkOff />
                    </IconButton>
                </Tooltip>
                :
                <IconButton href = {props.link} target = '_blank' rel = 'noreferrer noopener'>
                    <Link/>
                </IconButton>
            }
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

export default PublicationCard
