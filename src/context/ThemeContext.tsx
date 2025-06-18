// context/ThemeContext.tsx
import { darkTheme, lightTheme } from "@/styles/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";

interface ThemeContextType {
    theme: 'light' | 'dark';
    onChangeTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: 'light',
    onChangeTheme: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const onChangeTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        await AsyncStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const load = async () => {
            const saved = await AsyncStorage.getItem("theme");
            if (saved === "dark") setTheme("dark");
        };
        load();
    }, []);

    const currentTheme = theme === "dark" ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, onChangeTheme }}>
            <PaperProvider theme={currentTheme}>
                {children}
            </PaperProvider>
        </ThemeContext.Provider>
    );
}
