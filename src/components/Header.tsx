import { useAuth } from '@/hook/useAuth';
import { useTheme } from '@/hook/useTheme';
import { styles } from '@/styles/header.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React, { useState } from 'react';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Switch, useTheme as usePaperTheme } from 'react-native-paper';

export default function Header(): React.JSX.Element {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { user, signOut } = useAuth();
    const { onChangeTheme, theme } = useTheme();
    const paperTheme = usePaperTheme();
    const isDarkMode = theme === 'dark';

    const initials = user?.name ? user.name.charAt(0).toUpperCase() : '?';
    const today = moment().format('dddd, DD MMMM');

    function toogleModal() {
        setOpenModal(prev => !prev)
    }

    return (
        <View style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>

            <TouchableOpacity style={styles.userInfo} onPress={toogleModal}>
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
            </TouchableOpacity>

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

