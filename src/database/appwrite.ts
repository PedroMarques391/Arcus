import {
    Account,
    Client,
    Databases,
    Storage
} from 'react-native-appwrite';

interface RealTimeResponse {
    events: string[],
    payload: any[]
}

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT)
    .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATAFORM)


const account = new Account(client);
const database = new Databases(client)
const storage = new Storage(client)

const DATABASE_ID = process.env.EXPO_PUBLIC_DB_ID
const HABITS_COLLECTION_ID = process.env.EXPO_PUBLIC_HABITS_COLLECTION_ID
const HABITS_COMPLETIONS_ID = process.env.EXPO_PUBLIC_HABITS_COMPLETIONS_ID
const BUCKET_ID = process.env.EXPO_PUBLIC_BUCKET_ID


export {
    account, BUCKET_ID, client,
    database, DATABASE_ID,
    HABITS_COLLECTION_ID,
    HABITS_COMPLETIONS_ID,
    RealTimeResponse,
    storage
};

