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
                <Image
                    style={styles.image}
                    source={require('../../../assets/images/app/logo.png')}
                />
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
    image: {
        alignSelf: 'center',

    },
    content: {
        padding: 20,
        justifyContent: "center",
        gap: 10
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#22223b",
        textAlign: "center",
        marginBottom: 14,
        letterSpacing: 1,
    }
})