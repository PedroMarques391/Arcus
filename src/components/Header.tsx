import { useAuth } from '@/hook/useAuth';
import { useTheme as onTheme } from '@/hook/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Header(): React.JSX.Element {
    const { user, signOut } = useAuth();
    const { onChangeTheme } = onTheme();
    const theme = useTheme()

    const initials = user?.name ? user.name.charAt(0).toUpperCase() : '?';
    const today = moment().format('dddd, DD MMMM');

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.userInfo}>
                <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <View>
                    <Text style={[styles.greeting, { color: theme.colors.onBackground }]}>Bem-vindo,</Text>
                    <Text style={[styles.username, { color: theme.colors.primary }]}>
                        {user?.name || 'Usuário'}
                    </Text>
                    <Text style={[styles.date, { color: theme.colors.onBackground }]}>
                        {today}
                    </Text>
                </View>
            </View>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onChangeTheme} style={styles.iconButton}>
                    <MaterialCommunityIcons
                        name={theme.dark ? 'white-balance-sunny' : 'weather-night'}
                        size={26}
                        color={theme.colors.primary}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={signOut} style={styles.iconButton}>
                    <MaterialCommunityIcons name="logout" size={26} color={theme.colors.error} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 40 : 40,
        paddingBottom: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 14,
        marginBottom: -5,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        marginTop: 4,
    },
    actions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8, // Se der erro, substitui o 'gap' por marginLeft individual
    },
    iconButton: {
        padding: 6,
    },
});
