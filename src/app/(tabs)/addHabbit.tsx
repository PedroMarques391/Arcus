import {
    database,
    DATABASE_ID,
    HABITS_COLLECTION_ID
} from "@/database/appwrite";
import { useAuth } from "@/hook/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import { Button, SegmentedButtons, Text, TextInput, useTheme } from "react-native-paper";

const FREQUENCY: string[] = ['daily', 'weekly', 'monthly']
type TFrequency = (typeof FREQUENCY)[number]

export default function AddHabbitPage() {
    const [title, setTitle] = useState<string>()
    const [description, setDescription] = useState<string>()
    const [frequency, setFrequency] = useState<TFrequency>('daily')
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const theme = useTheme()
    const { user } = useAuth()

    async function handleSubmit() {
        if (!user) return

        try {
            await database.createDocument(
                DATABASE_ID, HABITS_COLLECTION_ID, ID.unique(),
                {
                    user_id: user.$id,
                    title,
                    description,
                    streak_count: 0,
                    last_completed: new Date().toISOString(),
                    frequency,
                    created_at: new Date().toISOString(),
                })
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
        <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',

    },
    input: {
        marginBottom: 16
    },
    frequencyView: {
        marginBottom: 24
    },
    button: {
        marginTop: 8
    }
})