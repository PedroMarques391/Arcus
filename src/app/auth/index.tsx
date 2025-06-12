import { SignIn } from "@/components/SignIn";
import { SignUp } from "@/components/SignUp";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text } from 'react-native-paper';

export default function AuthPage() {
    const [screen, setScreen] = useState<'signIn' | 'signUp'>('signIn')

    function handleScreen() {
        setScreen(screen === 'signIn' ? 'signUp' : 'signIn')
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.content}>
                <View style={styles.logoView}>
                    <Image
                        source={require('../../../assets/images/app/logo.png')}
                    />
                    <Text style={styles.appName}>Arcus</Text>
                </View>
                <Text style={styles.title}>{screen === "signUp" ? 'Venha fazer parte' : 'Bem vindo de volta'}</Text>
                {screen === "signIn"
                    ? <SignIn />
                    : <SignUp />
                }
                <Button
                    mode="text"
                    uppercase={false}
                    onPress={handleScreen}>
                    {screen === "signIn"
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
        left: 84,
        letterSpacing: 10,
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: "700",
        color: '#5C6BF5'
    },
    content: {
        padding: 20,
        justifyContent: "flex-start",
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#22223b",
        textAlign: "center",
        marginVertical: 15,
        letterSpacing: 1,
    }
})