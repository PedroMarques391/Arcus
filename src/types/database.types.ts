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


export type {
    IHabits
};
