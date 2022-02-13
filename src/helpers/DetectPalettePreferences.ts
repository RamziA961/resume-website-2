import { useMediaQuery } from "@mui/material"

const DetectPalettePreferences = (): 'dark' | 'light' => {
    const sysPrefPalette = useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'
 
    const prefPalette : 'dark' | 'light' | null = 
        localStorage.getItem('palette')  === 'dark' || localStorage.getItem('palette') === 'light' ?
        localStorage.getItem('palette') as 'dark' | 'light'  
        : 
        sysPrefPalette

    localStorage.setItem('palette', prefPalette)
    return prefPalette
}

export default DetectPalettePreferences