import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const lightTheme = {
    ...MD3LightTheme,
    myOwnProperty: true,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#5c6bf5',
        onPrimary: '#ffffff',
        background: '#f5f5f5',
        surface: '#ffffff',
        onSurface: '#1c1c1e',
        secondaryContainer: '#a5b4fc',
        surfaceVariant: '#fff',
        outline: '#d1d5db',
        backdrop: '#ffffff',
        error: '#ef4444',
        onError: '#ffffff',
        primaryContainer: '#7c3aed',
        shadow: 'rgba(0,0,0,0.08)',
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    myOwnProperty: true,
    colors: {
        ...MD3DarkTheme.colors,
        background: '#121212',
        surface: '#1e1e1e',
        surfaceVariant: '#2a2a2a',
        backdrop: '#2a2a2a',
        onBackground: '#ededed',
        onSurface: '#ededed',
        primary: '#7c3aed',
        onPrimary: '#ffffff',
        onSecondary: '#000000',
        primaryContainer: '#3d2b72',
        secondaryContainer: '#3d2b72',
        outline: '#2a2a2a',
        error: '#cf6679',
        onError: '#000000',
    },
};