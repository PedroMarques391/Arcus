import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/database/appwrite";
import { useAuth } from "@/hook/useAuth";
import { StyleSheet, Text, View } from "react-native";
import { Query } from "react-native-appwrite";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut, user } = useAuth()

  async function fetchHabits() {
    try {
      const response = await database.listDocuments(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        [Query.equal('user_id', user?.$id ?? '')]
      )
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <Text>Tela inicial</Text>
      <Button
        mode="text"
        onPress={signOut}>Sair da conta</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    width: 100,
    height: 20,
    backgroundColor: 'coral',
    borderRadius: 8,
    textAlign: "center",
  },
});