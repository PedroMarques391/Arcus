import { useAuth } from '@/hook/useAuth';
import { useTheme } from '@/hook/useTheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Switch, useTheme as usePaperTheme } from 'react-native-paper';

export default function Header(): React.JSX.Element {
    const { user, signOut } = useAuth();
    const { onChangeTheme, theme } = useTheme();
    const paperTheme = usePaperTheme();
    const isDarkMode = theme === 'dark';

    const initials = user?.name ? user.name.charAt(0).toUpperCase() : '?';
    const today = moment().format('dddd, DD MMMM');

    return (
        <View style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>
            <View style={styles.userInfo}>
                <View style={[styles.avatar, { backgroundColor: paperTheme.colors.primary }]}>
                    <Text style={styles.avatarText}>{initials}</Text>
                </View>
                <View>
                    <Text style={[styles.greeting, { color: paperTheme.colors.onBackground }]}>Bem-vindo,</Text>
                    <Text style={[styles.username, { color: paperTheme.colors.primary }]}>
                        {user?.name || 'Usuário'}
                    </Text>
                    <Text style={[styles.date, { color: paperTheme.colors.onBackground }]}>
                        {today}
                    </Text>
                </View>
            </View>

            <View style={styles.actions}>
                <MaterialCommunityIcons
                    name={isDarkMode ? 'weather-night' : 'white-balance-sunny'}
                    size={20}
                    color={paperTheme.colors.primary}
                />
                <Switch
                    value={isDarkMode}
                    onValueChange={onChangeTheme}
                    color={paperTheme.colors.primary}
                    style={styles.switch}
                />
                <TouchableOpacity onPress={signOut} style={styles.iconButton}>
                    <MaterialCommunityIcons
                        name="logout"
                        size={26}
                        color={paperTheme.colors.error}
                    />
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
        paddingTop: Platform.OS === 'ios' ? 60 : 40,
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
        gap: 6,
    },
    iconButton: {
        padding: 6,
    },
    switch: {
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
    },
});
