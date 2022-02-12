import { createContext, useMemo, useState } from 'react'
import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'

const ColorModeContext = createContext({
    toggleColorMode: () => {}
})

export const ColorModeProvider : React.FC<{}> = (props) => {

    const [mode, setMode] = useState<'light' | 'dark'>(
        useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
    )
    
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