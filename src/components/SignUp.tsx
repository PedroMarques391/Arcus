import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

type TSignUpProps = {
    singUp: (name: string, email: string, password: string) => Promise<string | null>
}

export function SignUp({ singUp }: TSignUpProps): React.JSX.Element {
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>('')
    const theme = useTheme()
    const router = useRouter()

    async function handleAuth() {
        if (!email || !password || !name) {
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
            const error = await singUp(name, email, password)

            if (error) {
                return setError(error)
            }

            router.replace('/')


        } catch (error) {
            console.error('[handleAuth - SignUp] - Erro ao criar conta.', error)
        }

    }
    return (
        <>
            <TextInput
                label='nome'
                onChangeText={(text) => setName(text)}
                placeholder="John Doe"
                keyboardType="default"
                autoCapitalize="none"
                mode="outlined"
                value={name}
            />
            <TextInput
                label='email'
                onChangeText={(text) => setEmail(text)}
                placeholder="email@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
                value={email}
            />
            <TextInput
                label='senha'
                onChangeText={(text) => setPassword(text)}
                placeholder="Sua senha..."
                keyboardType="default"
                autoCapitalize="none"
                mode="outlined"
                value={password}
                secureTextEntry
            />

            {error && <Text
                style={{ color: theme.colors.error }}
                variant="bodyMedium">{error}</Text>}

            <Button
                onPress={handleAuth}
                style={{
                    marginTop: 20
                }}
                mode="contained">
                Criar Conta
            </Button>
        </>
    )
}

