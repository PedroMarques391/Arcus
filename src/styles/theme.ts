import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

export const lightTheme = {
    ...MD3LightTheme,
    myOwnProperty: true,
    colors: {
        ...MD3LightTheme.colors,
        primary: '#5C6BF5',
        onPrimary: '#ffffff',
        background: '#f5f5f5',
        surface: '#ffffff',
        onSurface: '#1C1C1E',
        secondaryContainer: '#A5B4FC',
        surfaceVariant: '#fff',
        outline: '#D1D5DB',
        error: '#EF4444',
        onError: '#ffffff',
        primaryContainer: '#7C3AED',
        shadow: 'rgba(0,0,0,0.08)',
    },
};

export const darkTheme = {
    ...MD3DarkTheme,
    myOwnProperty: true,
    colors: {
        ...MD3DarkTheme.colors,
        background: '#121212',
        surface: '#1E1E1E',
        surfaceVariant: '#2A2A2A',

        onBackground: '#EDEDED',
        onSurface: '#EDEDED',

        primary: '#7C3AED',
        onPrimary: '#FFFFFF',

        onSecondary: '#000000',

        primaryContainer: '#3D2B72',
        secondaryContainer: '#3D2B72',
        outline: '#2A2A2A',
        error: '#CF6679',
        onError: '#000000',
    },
};