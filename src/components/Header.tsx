import { useAuth } from '@/hook/useAuth';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from 'react-native-paper';

export default function Header(): React.JSX.Element {
    const { user, signOut } = useAuth();

    const theme = useTheme()

    const initials = user?.name ? user.name.charAt(0).toUpperCase() : '?';

    return (
        <View style={styles.container}>
            <View style={styles.userInfo}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <View>
                    <Text style={styles.greeting}>Olá,</Text>
                    <Text style={styles.username}>{user?.name || 'Usuário'}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={signOut} style={styles.logoutButton} >
                <MaterialCommunityIcons name="logout" size={30} color={theme.colors.error} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 120 : 80,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: Platform.OS === 'ios' ? 30 : 20,

    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        backgroundColor: '#5C6BF5',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    avatarText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    greeting: {
        fontSize: 14,
        color: '#888',
    },
    username: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: 8,
    },
});
