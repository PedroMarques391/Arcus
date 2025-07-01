import { database, DATABASE_ID, HABITS_COLLECTION_ID, HABITS_COMPLETIONS_ID } from "@/database/appwrite";
import { IHabitCompletions, IHabits } from "@/types/database.types";
import { ID, Models, Query } from "react-native-appwrite";

interface IcreateHabit {
    databaseId: string;
    habitsCollection: string;
    id: string;
    user: Models.User<Models.Preferences>,
    title: string;
    description: string;
    frequency: string;
}

async function createHabit(user: Models.User<Models.Preferences>, title: string, description: string, frequency: string) {
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
}


async function getHabits(user: Models.User<Models.Preferences>): Promise<Models.DocumentList<Models.Document>> {
    const response = await database.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal('user_id', user?.$id ?? '')]
    )
    if (!response.documents) {
        throw new Error("No habits found for the user.");
    }
    return response
}

async function getTodayCompletions(user: Models.User<Models.Preferences>): Promise<IHabitCompletions[]> {
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
    return completions
}

async function updateHabit(habit: IHabits, id: string, getCurrentDate: string) {
    await database.updateDocument(DATABASE_ID, HABITS_COLLECTION_ID, id, {
        streak_count: habit.streak_count + 1,
        last_completed: getCurrentDate
    })
}




export {
    createHabit,
    getHabits,
    getTodayCompletions,
    updateHabit
};
