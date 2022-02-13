import { createContext, useMemo, useState } from 'react'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'

const ColorModeContext = createContext({
    toggleColorMode: () => {}
})

export const ColorModeProvider : React.FC<{}> = (props) => {

    let pref : 'dark' | 'light' | null = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'

    pref = localStorage.getItem('palette')  === 'dark' || localStorage.getItem('palette') === 'light' ?
        localStorage.getItem('palette') as 'dark' | 'light'  
        : 
        pref

    const [mode, setMode] = useState<'light' | 'dark'>(pref)
    
    const colorMode = useMemo(() => ({
        toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        }
    }), [])

    const theme = useMemo(() =>
        createTheme({
          palette: {
            mode,
          },
        }
    ), [mode])

    return <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme = {theme}>
            {props.children}
        </ThemeProvider>
    </ColorModeContext.Provider>
}

export default ColorModeContext