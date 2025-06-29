import { useAuth } from '@/hook/useAuth';
import { useTheme } from '@/hook/useTheme';
import { styles } from '@/styles/header.styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';
import React, { useState } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Switch, useTheme as usePaperTheme } from 'react-native-paper';
import EditProfileModal from './Modal';

export default function Header(): React.JSX.Element {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const { user, signOut } = useAuth();
    const { onChangeTheme, theme } = useTheme();
    const paperTheme = usePaperTheme();
    const isDarkMode = theme === 'dark';

    const initials = user?.name ? user.name.charAt(0).toUpperCase() : '?';
    const today = moment().format('dddd, DD MMMM');

    return (
        <View style={[styles.container, { backgroundColor: paperTheme.colors.background }]}>
            {openModal && <EditProfileModal showModal={openModal} hideModal={() => setOpenModal(false)} />}
            <TouchableOpacity style={styles.userInfo} onPress={() => setOpenModal(prev => !prev)}>
                <View style={[styles.avatar, { backgroundColor: paperTheme.colors.primary }]}>
                    {user?.prefs?.photo ? (
                        <Image
                            style={{ width: '100%', height: '100%', overflow: 'hidden', borderRadius: 24 }}
                            source={{ uri: user.prefs.photo }}
                            resizeMode="cover"
                        />
                    ) : (
                        <Text style={styles.avatarText}>{initials}</Text>
                    )}
                </View>
                <View style={{ gap: 4, }}>
                    <Text style={[styles.username, { color: paperTheme.colors.primary }]}>
                        {user?.name || 'Usuário'}
                    </Text>
                    <Text style={[{ color: paperTheme.colors.secondary }]}>
                        {user?.email || 'Email não disponível'}
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

