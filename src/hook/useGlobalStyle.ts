import { StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';

export function useGlobalStyles() {
    const { colors } = useTheme();

    return StyleSheet.create({
        container: {
            flex: 1,
            padding: 16,
            backgroundColor: colors.background,
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            color: colors.primary,
        },
        text: {
            fontSize: 16,
            color: colors.onBackground,
        },
        card: {
            backgroundColor: colors.surfaceVariant,
            borderRadius: 16,
            shadowColor: colors.outline,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.08,
            shadowRadius: 6,
            elevation: 4,
        },
        cardContent: {
            padding: 20,
        },
        cardTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            color: colors.onSurface,
        },
        cardDescription: {
            fontSize: 14,
            color: colors.outline,
        },
        badge: {
            backgroundColor: colors.primaryContainer,
            borderRadius: 12,
            paddingHorizontal: 10,
            paddingVertical: 4,
        },
        badgeText: {
            color: colors.onPrimary,
            fontSize: 14,
            fontWeight: 'bold',
        },
        badgeSecondary: {
            backgroundColor: colors.secondaryContainer,
        },
        badgeSecondaryText: {
            color: colors.onSecondary,
        },
        errorText: {
            color: colors.error,
            fontSize: 14,
        },
    });
}
