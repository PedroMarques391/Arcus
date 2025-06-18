import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: "flex-start",
    },
    logoView: {
        alignSelf: 'center',
        position: "relative",
        width: 300,
        height: 200
    },
    appName: {
        position: "absolute",
        top: 170,
        left: 87,
        letterSpacing: 10,
        fontSize: 20,
        fontFamily: 'serif',
        fontWeight: "700",
    },
    content: {
        padding: 20,
        justifyContent: "flex-start",
        gap: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        letterSpacing: 1,
    }
})