import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Button, Text, TextInput, useTheme } from "react-native-paper";

type TSignInProps = {
    singIn: (email: string, password: string) => Promise<string | null>
    loading: boolean
}

export function SignIn({ singIn, loading }: TSignInProps): React.JSX.Element {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>('')
    const theme = useTheme()
    const router = useRouter()

    async function handleAuth() {
        if (!email || !password) {
            setError('Por favor, preencha todos os campos.')
            setTimeout(() => setError(null), 5000)
            return
        }

        if (password.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres.')
            setTimeout(() => setError(null), 5000)
            return
        }

        setError(null)

        try {
            const error = await singIn(email, password)
            if (error) {
                return setError(error)
            }
            router.replace('/')

        } catch (error) {
            console.error('[handleAuth - SignIn] - Erro ao acessar conta.', error)
        }
    }

    return (
        <>
            <TextInput
                label='email'
                value={email}
                placeholder="email@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                label='senha'
                value={password}
                placeholder="Sua senha..."
                keyboardType="default"
                autoCapitalize="none"
                mode="outlined"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
            />

            {error && <Text
                style={{ color: theme.colors.error }}
                variant="bodyMedium">{error}</Text>}

            <Button
                disabled={loading}
                onPress={handleAuth}
                style={{ marginTop: 20, height: 40 }}
                contentStyle={{ justifyContent: 'center', height: 40, }}
                mode="contained">{loading ? <ActivityIndicator size={"small"} color="#fff" />
                    : 'Entrar'}
            </Button>
        </>
    )
}