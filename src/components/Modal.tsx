import { account } from '@/database/appwrite';
import { useAuth } from '@/hook/useAuth';
import { useTheme } from '@/hook/useTheme';
import { uploadImageAsync } from '@/utils/uploadImage';
import { FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
    Image,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { Button, TextInput, useTheme as usePaperTheme } from 'react-native-paper';

interface IModalProps {
    showModal: boolean;
    hideModal: () => void;
}


export default function EditProfileModal({
    showModal,
    hideModal,
}: IModalProps): React.JSX.Element {
    const { user, getUser } = useAuth()
    const [name, setName] = useState<string>(user?.name || '');
    const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);
    const paperTheme = usePaperTheme();
    const { theme } = useTheme();

    useEffect(() => {
        if (user?.prefs?.photo) {
            setCurrentImageUrl(user.prefs.photo);
        }
    }, []);



    async function handleImagePicked(pickerResult: ImagePicker.ImagePickerResult) {
        try {
            if (!pickerResult.canceled) {
                await uploadImageAsync(pickerResult.assets[0]);
                getUser();
                setCurrentImageUrl(pickerResult.assets[0].uri);
                alert('Foto Alterada com sucesso!')
            }
        } catch (error) {
            console.log('[modal: handleImagePicker error]', error)
            alert('Algo deu errado!')

        }
    }

    async function pickImage() {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log('[modal: pickerResult]', { pickerResult })

        await handleImagePicked(pickerResult)
    }

    async function handleUpdateProfile() {
        try {
            if (!name.trim()) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            await account.updateName(name);
            getUser();
            hideModal();
            alert('Perfil atualizado com sucesso!');

        } catch (error) {
            console.log('[modal: handleUpdateProfile error]', error)
            alert('Algo deu errado!')
        }
    }

    return (
        <Modal
            transparent
            animationType="fade"
            visible={showModal}
            onRequestClose={hideModal}
        >
            <BlurView intensity={30} tint={theme === 'dark' ? 'prominent' : 'dark'} style={styles.blurContainer}>
                <View style={[styles.modalContent, { backgroundColor: paperTheme.colors.surfaceVariant }]}>
                    <TouchableOpacity onPress={hideModal} style={{ position: 'absolute', top: 10, right: 10 }}>
                        <FontAwesome name="close" size={28} color={paperTheme.colors.error} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={pickImage}
                        style={{ alignItems: 'center', width: '80%', marginHorizontal: 'auto' }}>
                        <Image
                            source={currentImageUrl ? { uri: `${currentImageUrl}` } : require('../../assets/images/app/camIcon.png')}
                            resizeMode='cover'
                            style={[styles.avatar, { borderColor: paperTheme.colors.primary }]}
                        />
                    </TouchableOpacity>

                    <Text style={[styles.linkText, { color: paperTheme.colors.onBackground }]}>Alterar foto</Text>

                    <TextInput
                        label='Nome'
                        placeholder="Jhon Doe"
                        keyboardType="default"
                        autoCapitalize="words"
                        mode="flat"
                        value={name}
                        onChangeText={setName}
                        style={{ marginBottom: 60 }}
                    />

                    <Button mode="contained" onPress={handleUpdateProfile}>
                        Salvar
                    </Button>
                </View>
            </BlurView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    blurContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        position: 'relative',
        width: '90%',
        borderRadius: 12,
        padding: 20,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
        borderWidth: 2,
    },

    linkText: {
        fontWeight: '500',
        textAlign: 'center',
        marginBottom: 16,
    },

});
