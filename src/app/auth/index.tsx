import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import { useAuth } from "@/hook/useAuth";
import { useGlobalStyles } from "@/hook/useGlobalStyle";
import { styles } from "@/styles/auth.styles";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, Text } from 'react-native-paper';

export default function AuthPage() {
    const [screen, setScreen] = useState<'signIn' | 'signUp'>('signIn')
    const { signIn, signUp, isLoadingAuth } = useAuth()
    const globals = useGlobalStyles();


    function handleScreen() {
        setScreen(screen === 'signIn' ? 'signUp' : 'signIn')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[globals.container, , { justifyContent: 'flex-start' }]}
        >
            <View style={styles.content}>
                <View style={styles.logoView}>
                    <Image
                        source={require('../../../assets/images/app/logo.png')}
                    />
                    <Text style={[styles.appName, globals.title]}>Arcus</Text>
                </View>
                <Text style={[styles.title, globals.text]}>{screen === "signUp" ? 'Venha fazer parte' : 'Bem vindo de volta'}</Text>
                {screen === "signIn"
                    ? <SignIn singIn={signIn} loading={isLoadingAuth} />
                    : <SignUp singUp={signUp} loading={isLoadingAuth} />
                }
                <Button
                    mode="text"
                    uppercase={false}
                    onPress={handleScreen}>
                    {screen === "signUp"
                        ? 'Já tem uma conta? Clique aqui'
                        : 'Não tem uma conta? Crie com um clique'}
                </Button>

            </View>
        </KeyboardAvoidingView>
    )
}


