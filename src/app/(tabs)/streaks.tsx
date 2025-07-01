import { HABITS_COLLECTION_ID, HABITS_COMPLETIONS_ID } from "@/database/appwrite";
import { useAuth } from "@/hook/useAuth";
import { useGlobalStyles } from "@/hook/useGlobalStyle";
import { getHabits } from "@/hook/useHabits";
import { styles } from "@/styles/streaks.styles";
import { IHabitCompletions, IHabits } from "@/types/database.types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
interface IStreakData {
    streak: number,
    bestStreak: number,
    total: number
}

export default function StreaksPage() {
    const [habits, setHabits] = useState<IHabits[]>([])
    const [completedHabits, setCompletedHabits] = useState<IHabitCompletions[]>([])
    const { user } = useAuth()
    const globals = useGlobalStyles();


    useEffect(() => {
        if (user) {
            fetchHabits()
            fetchCompletions()
        }
    }, [user])

    async function fetchHabits() {
        try {
            const response = await getHabits(user!, HABITS_COLLECTION_ID)
            setHabits(response.documents as IHabits[])
        } catch (error) {
            console.log(error)
        }
    }

    async function fetchCompletions() {
        try {
            const response = await getHabits(user!, HABITS_COMPLETIONS_ID)
            const completions = response.documents as IHabitCompletions[]
            setCompletedHabits(completions)
        } catch (error) {
            console.log(error)
        }
    }

    const getStreakData = (habitId: string): IStreakData => {
        const habitCompletions = completedHabits
            ?.filter((completedHabit) =>
                completedHabit.habit_id === habitId)
            .sort((a, b) => new Date(a.completed_at).getTime() - new Date(b.completed_at).getTime())

        if (habitCompletions?.length === 0) {
            return { streak: 0, bestStreak: 0, total: 0 }
        }

        let streak = 0
        let bestStreak = 0
        let total = habitCompletions?.length

        let lastDate: Date | null = null
        let currentStreak = 0

        habitCompletions.forEach((habitCompletion) => {
            const date = new Date(habitCompletion.completed_at)
            if (lastDate) {
                const diff =
                    (date.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24);

                if (diff <= 1.5) {
                    currentStreak += 1;
                } else {
                    currentStreak = 1;
                }
            } else {
                currentStreak = 1;
            }

            if (currentStreak > bestStreak) bestStreak = currentStreak;
            streak = currentStreak;
            lastDate = date;
        })

        return {
            streak,
            bestStreak,
            total
        }

    }

    const habitStreaks = habits.map((habit) => {
        const { streak, bestStreak, total } = getStreakData(habit.$id)
        return { habit, bestStreak, streak, total }
    })

    const rankedHabits = habitStreaks.sort((a, b) => b.bestStreak - a.bestStreak);


    const badgeStyles = [styles.badge1, styles.badge2, styles.badge3];
    return (
        <View style={globals.container}>
            <Text style={styles.title} variant="headlineSmall">
                Sequência
            </Text>
            {rankedHabits.length > 0 && (
                <View style={[styles.rankingContainer, globals.card]}>
                    <Text style={[styles.rankingTitle, globals.title]}> 🏅 Melhores Sequências</Text>
                    {rankedHabits.slice(0, 3).map((item, key) => (
                        <View key={key} style={styles.rankingRow}>
                            <View style={[styles.rankingBadge, badgeStyles[key]]}>
                                <Text style={styles.rankingBadgeText}> {key + 1} </Text>
                            </View>
                            <Text style={[styles.rankingHabit, globals.text]}> {item.habit.title}</Text>
                            <Text style={styles.rankingStreak}> {item.bestStreak}</Text>
                        </View>
                    ))}
                </View>
            )}

            {habits.length === 0 ? (
                <View style={[globals.container, { alignItems: "center", }]}>
                    <Text>Você ainda não tem hábitos. </Text>
                    <Link
                        style={{ color: "#7c4dff", fontWeight: "bold", marginTop: 8 }}
                        href={'/addHabbit'}
                    >
                        Adicione seu primeiro hábito aqui!
                    </Link>
                </View>
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={globals.container}
                >
                    {rankedHabits.map(({ habit, streak, bestStreak, total }, key) => (
                        <Card
                            key={key}
                            style={[styles.card, key === 0 && styles.firstCard]}
                        >
                            <Card.Content>
                                <Text variant="titleMedium" style={styles.habitTitle}>
                                    {habit.title}
                                </Text>
                                <Text style={styles.habitDescription}>
                                    {habit.description}
                                </Text>
                                <View style={styles.statsRow}>
                                    <View style={styles.statBadge}>
                                        <Text style={styles.statBadgeText}> 🔥 {streak}</Text>
                                        <Text style={styles.statLabel}> Atual</Text>
                                    </View>
                                    <View style={styles.statBadgeGold}>
                                        <Text style={styles.statBadgeText}> 🏆 {bestStreak}</Text>
                                        <Text style={styles.statLabel}> Melhor</Text>
                                    </View>
                                    <View style={styles.statBadgeGreen}>
                                        <Text style={styles.statBadgeText}> ✅ {total}</Text>
                                        <Text style={styles.statLabel}> Total</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    ))}
                </ScrollView>
            )}
        </View>
    );
}



