import { client, database, DATABASE_ID, HABITS_COLLECTION_ID, HABITS_COMPLETIONS_ID, RealTimeResponse } from "@/database/appwrite";
import { useAuth } from "@/hook/useAuth";
import { useGlobalStyles } from "@/hook/useGlobalStyle";
import { styles } from "@/styles/index.styles";
import { IHabitCompletions, IHabits } from "@/types/database.types";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ScrollView, View } from "react-native";
import { ID, Query } from "react-native-appwrite";
import { Swipeable } from "react-native-gesture-handler";
import { Surface, Text } from "react-native-paper";

export default function Index() {
  const [habits, setHabits] = useState<IHabits[]>([])
  const [completedHabits, setCompletedHabits] = useState<string[]>([])
  const { user } = useAuth()
  const ref = useRef<{ [key: string]: Swipeable | null }>({})
  const globals = useGlobalStyles();



  useEffect(() => {
    if (user) {
      const habitsChannel = `databases.${DATABASE_ID}.collections.${HABITS_COLLECTION_ID}.documents`
      const habitsSubscription = client.subscribe(habitsChannel, (response: RealTimeResponse) => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          fetchHabits()
          return
        }
        if (response.events.includes('databases.*.collections.*.documents.*.update')) {
          fetchHabits()
          return
        }

        if (response.events.includes('databases.*.collections.*.documents.*.delete')) {
          fetchHabits()
          return
        }

      }
      )
      const completionsChannel = `databases.${DATABASE_ID}.collections.${HABITS_COMPLETIONS_ID}.documents`

      const completionsSubscription = client.subscribe(completionsChannel, (response: RealTimeResponse) => {
        if (response.events.includes('databases.*.collections.*.documents.*.create')) {
          fetchTodayCompletions()
          return
        }
      })

      fetchHabits()
      fetchTodayCompletions()

      return () => {
        habitsSubscription()
        completionsSubscription()
      }
    }
  }, [user])

  async function fetchHabits() {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal('user_id', user?.$id ?? '')]
      )
      setHabits(response.documents as IHabits[])
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchTodayCompletions() {
    try {
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      const response = await database.listDocuments(
        DATABASE_ID,
        HABITS_COMPLETIONS_ID,
        [
          Query.equal('user_id', user?.$id ?? ''),
          Query.greaterThanEqual('completed_at', today.toISOString())
        ]
      )
      const completions = response.documents as IHabitCompletions[]
      setCompletedHabits(completions.map((c) => c.habit_id))
    } catch (error) {
      console.log(error)
    }
  }

  const isHabitCompleted = (habitId: string): boolean => completedHabits?.includes(habitId)


  function renderLeftActions() {
    return (
      <View style={styles.swipeActionLeft}>
        <MaterialCommunityIcons name="trash-can-outline" size={26} color={'#fff'} />
      </View>
    )
  }

  async function handleDeleteHabit(id: string) {
    try {
      await database.deleteDocument(DATABASE_ID, HABITS_COLLECTION_ID, id)
    }
    catch (error) {
      console.error(error)

    }
  }
  async function handleCompleteHabit(id: string) {
    if (!user || completedHabits?.includes(id)) return
    try {
      const getCurrentDate = new Date().toISOString()
      await database.createDocument(DATABASE_ID, HABITS_COMPLETIONS_ID, ID.unique(), {
        habit_id: id,
        user_id: user.$id,
        completed_at: getCurrentDate
      })
      const habit = habits.find((habit) => habit.$id === id)
      if (!habit) return

      await database.updateDocument(DATABASE_ID, HABITS_COLLECTION_ID, id, {
        streak_count: habit.streak_count + 1,
        last_completed: getCurrentDate
      })

    }
    catch (error) {
      console.error(error)
    }


  }

  function renderRightActions(habit_id: string) {
    return (
      <View style={styles.swipeActionRight}>
        {isHabitCompleted(habit_id)
          ? <Text style={{ color: '#fff' }}>Concluido</Text>
          : <MaterialCommunityIcons name="check-circle-outline" size={26} color={'#fff'} />}
      </View>
    )
  }

  return (
    <View style={globals.container}>
      <View style={styles.header}>
        <Text variant="headlineSmall" style={styles.title}>
          O que temos para hoje?
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {habits.length === 0
          ? (
            <View style={[globals.container, { alignItems: "center", }]}>
              <Text>Você ainda não tem hábitos. </Text>
              <Link
                style={{ color: "#7c4dff", fontWeight: "bold", marginTop: 8 }}
                href={'/addHabbit'}
              >
                Adicione seu primeiro hábito aqui!
              </Link>
            </View>
          )
          :
          (
            habits?.map((habit, key) => (
              <Swipeable
                overshootLeft={false}
                overshootRight={false}
                renderLeftActions={renderLeftActions}
                renderRightActions={() => renderRightActions(habit.$id)}
                key={key}
                ref={(value) => {
                  ref.current[habit.$id] = value
                }}
                onSwipeableOpen={(direction) => {
                  if (direction === "left") {
                    handleDeleteHabit(habit.$id)
                  }
                  if (direction === 'right') {
                    handleCompleteHabit(habit.$id)
                  }
                  ref.current[habit.$id]?.close()
                }}>


                <Surface
                  style={[styles.card, globals.card, isHabitCompleted(habit.$id) && styles.cardCompleted]} elevation={0}>
                  <View style={[styles.cardContent, globals.cardContent]}>
                    <Text style={[styles.cardTitle, globals.cardTitle, isHabitCompleted(habit.$id) && styles.cardTextCompleted]}>{habit.title}</Text>
                    <Text style={[styles.cardDescription, globals.cardDescription, isHabitCompleted(habit.$id) && styles.cardTextCompleted]}>{habit.description}</Text>
                    <View style={styles.cardFooter}>
                      <View style={styles.streakBadge}>
                        <MaterialCommunityIcons name="fire" size={18} color={'#ff9800'} />
                        <Text style={styles.streakText}>
                          boa! sequência de {habit.streak_count} dias
                        </Text>
                      </View>
                      <View style={[styles.frequencyBadge, globals.badge]}>
                        <Text style={[styles.frequencyText, globals.badgeText]}>{habit.frequency.charAt(0).toUpperCase() + habit.frequency.slice(1)}</Text>
                      </View>
                    </View>
                  </View>
                </Surface>
              </Swipeable>
            ))
          )
        }
      </ScrollView>
    </View >
  );
}

