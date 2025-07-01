import { useAuth } from "@/hook/useAuth";
import { useGlobalStyles } from "@/hook/useGlobalStyle";
import { createHabit } from "@/hook/useHabits";
import { styles } from "@/styles/addHabits.styles";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";

const FREQUENCY: string[] = ['daily', 'weekly', 'monthly']
type TFrequency = (typeof FREQUENCY)[number]

export default function AddHabbitPage() {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [frequency, setFrequency] = useState<TFrequency>('daily')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const globals = useGlobalStyles();
    const theme = useTheme()
    const { user } = useAuth()

    async function handleSubmit() {
        if (!user) return

        try {
            await createHabit(user, title, description, frequency,)
            setTitle('')
            setDescription('')

            router.push("/")
        } catch (error: any) {
            if (error instanceof Error) {
                setError(error.message)
                setTimeout(() => setError(null), 5000)
            }
            setError('Tivemos um erro ao cadastrar seu hábito, tenta novamente.')
            setTimeout(() => setError(null), 5000)
        }
    }

    return (
        <View style={globals.container}>
            <TextInput
                value={title}
                label='Título'
                mode="outlined"
                style={styles.input}
                onChangeText={(text) => setTitle(text)} />
            <TextInput
                value={description}
                label='Descrição'
                mode="outlined"
                style={styles.input}
                onChangeText={(text) => setDescription(text)} />
            <View style={styles.frequencyView}>
                <SegmentedButtons
                    density="medium"
                    value={frequency}
                    onValueChange={(value) => setFrequency(value as TFrequency)}
                    buttons={FREQUENCY.map((freq) => ({
                        value: freq,
                        label: freq.charAt(0).toUpperCase() + freq.slice(1)
                    }))}
                />
            </View>
            {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
            <Button
                disabled={!title || !description}
                onPress={handleSubmit}
                style={styles.button}
                mode="contained">Adicionar Hábito</Button>
        </View>
    )
}
