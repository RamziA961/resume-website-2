import { Button, Card, CardActions, CardContent, CardHeader, Collapse, Stack, Typography } from "@mui/material"
import { ExpandMore, Link, LinkOff } from '@mui/icons-material'

import Expand from './Expand'
import { useState } from "react"

export type ProjectCardType = {
    title: string
    start: string,
    end: string,
    collaborators: string[]
    description: string
    papers: { [title: string] : string }
}

const ProjectCard = (props: ProjectCardType): JSX.Element => {
    const [isExpanded, setExpanded] = useState(false)

    return <Card sx={{width: '100%'}}>
        <CardHeader
            title = {props.title}
            subheader = {props.collaborators.join(', ')}
        />
        <CardContent>
            <Typography variant = 'overline'>
                {`${props.start} - ${props.end}`}
            </Typography>
            <Typography variant = 'body2' color = 'text.secondary'>
                {props.description}
            </Typography>
        </CardContent>
        {props.papers !== undefined && Object.keys(props.papers).length !== 0 ? 
            <>
                <CardActions>
                    <Expand expanded = {isExpanded} onClick = {() => setExpanded(!isExpanded)}>
                        <ExpandMore/>
                    </Expand>
                </CardActions>
                <Collapse in = {isExpanded} unmountOnExit>
                    <Stack display = 'flex' flexDirection = 'column' alignItems = 'center'>
                        {Object.keys(props.papers).map((title, i) => 
                            <Button
                                key = { title }
                                href = { props.papers[title] } 
                                target = '_blank' 
                                rel="noreferrer noopener"
                                startIcon = { props.papers[title] === '' ? 
                                <LinkOff fontSize = 'small'/> 
                                :
                                <Link fontSize = 'small'/>
                                }
                            >
                                <Typography align = 'left' key = {i} variant = 'overline'>
                                    {title}
                                </Typography>
                            </Button>
                        )}
                    </Stack>
                </Collapse>
            </>
            :
            undefined // do nothing
        }
    </Card>
}

export default ProjectCard