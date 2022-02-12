import { IconButton, IconButtonProps } from "@mui/material";
// import { transform } from "typescript";

interface ExpandProps extends IconButtonProps {
    expanded: boolean
}

const Expand = (props: ExpandProps) => {
    
    const {expanded, ...other} = props

    const style = {
        transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transitionDuration: '0.1'
    }

    return <IconButton {...other} style = {style}/>
}

export default Expand