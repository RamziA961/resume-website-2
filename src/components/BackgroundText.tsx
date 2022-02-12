import { Paper, SxProps, Theme, Typography } from "@mui/material";


const BackGroudText : React.FC<{
    elevation: number
    style: SxProps<Theme>
    variant?: "inherit" | "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "overline" 
}> = (props) => {

    return (
        <Paper elevation = {props.elevation} sx = {props.style}>
            <Typography variant = 'body2'>
                {props.children}
            </Typography>
        </Paper>
    )
}

export default BackGroudText