import { Tooltip, Paper } from "@mui/material"

const BackGroundIcon: React.FC<{
    elevation: number,
    placement: 'top' | 'bottom'
    title: string
}> = (props): JSX.Element => {
    const { 
        elevation,
        placement,
        title,
        children
    } = props

    return (
        <Tooltip title = {title} placement = {placement}>    
            <Paper elevation = {elevation} style = {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {children}
            </Paper>
        </Tooltip>  
    )
}

export default BackGroundIcon