import { Models } from "react-native-appwrite";

interface IHabits extends Models.Document {
    user_id: string,
    title: string,
    description: string,
    frequency: string,
    streak_count: number,
    last_completed: string,
    creates_at: string


}
interface IHabitCompletions extends Models.Document {
    habit_id: string,
    user_id: string,
    title: string,
    description: string,
    frequency: string,
    streak_count: number,
    last_completed: string,
    created_at: string


}



export type {
    IHabitCompletions, IHabits
};

