import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useEffect, useState } from "react";

interface IThemeProviderProps {
    children?: ReactNode
}

interface IThemeContext {
    theme?: string
    onChangeTheme?: () => void
}


const ThemeContext = createContext<IThemeContext>({})

function ThemeProvider({ children }: IThemeProviderProps) {
    const [theme, setTheme] = useState<'dark' | 'light'>('light')

    const onChangeTheme = async (): Promise<void> => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        await AsyncStorage.setItem("theme", newTheme)
    }

    useEffect(() => {
        const loadTheme = async () => {
            const value = await AsyncStorage.getItem('theme')
            if (!value || (value !== 'light' && value !== 'dark')) {
                setTheme('light')
            } else {
                setTheme(value as 'light' | 'dark')
            }
        }
        loadTheme()
    }, [])
    return (
        <ThemeContext.Provider value={{
            onChangeTheme,
            theme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}


export {
    ThemeContext,
    ThemeProvider
};
