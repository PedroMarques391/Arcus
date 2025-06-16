import { useAuth } from '@/hook/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Header(): React.JSX.Element {
    const { user, signOut } = useAuth();
    const theme = useTheme();

    const initials = user?.name ? user.name.charAt(0).toUpperCase() : '?';
    const today = moment().format('dddd, DD MMMM');

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
            <View style={styles.userInfo}>
                <View style={[styles.avatar, { backgroundColor: theme.colors.primary }]}>
                    <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <View>
                    <Text style={[styles.greeting, { color: theme.colors.onBackground }]}>Olá,</Text>
                    <Text style={[styles.username, { color: theme.colors.primary }]}>
                        {user?.name || 'Usuário'}
                    </Text>
                    <Text style={[styles.date, { color: theme.colors.onBackground }]}>
                        {today}
                    </Text>
                </View>
            </View>

            <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
                <MaterialCommunityIcons name="logout" size={28} color={theme.colors.error} />
            </TouchableOpacity>
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
        marginBottom: 2,
    },
    username: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    date: {
        fontSize: 12,
        marginTop: 4,
    },
    logoutButton: {
        padding: 8,
    },
});
