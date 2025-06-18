import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import { useAuth } from "@/hook/useAuth";
import { useGlobalStyles } from "@/hook/useGlobalStyle";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';

export default function AuthPage() {
    const [screen, setScreen] = useState<'signIn' | 'signUp'>('signIn')
    const { signIn, signUp, isLoadingUser } = useAuth()
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
                    ? <SignIn singIn={signIn} loading={isLoadingUser} />
                    : <SignUp singUp={signUp} />
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


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: "flex-start",
    },
    logoView: {
        alignSelf: 'center',
        position: "relative",
        width: 300,
        height: 200
    },
    appName: {
        position: "absolute",
        top: 170,
        left: 87,
        letterSpacing: 10,
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: "700",
    },
    content: {
        padding: 20,
        justifyContent: "flex-start",
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        letterSpacing: 1,
    }
})