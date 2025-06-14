import { useAuth } from "@/hook/useAuth";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

export default function Index() {
  const { signOut } = useAuth()
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