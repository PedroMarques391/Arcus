import React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

export function SignIn(): React.JSX.Element {
    return (
        <>
            <TextInput
                label='email'
                placeholder="email@gmail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                mode="outlined"
            />
            <TextInput
                label='senha'
                placeholder="Sua senha..."
                keyboardType="default"
                autoCapitalize="none"
                mode="outlined"
                secureTextEntry
            />

            <Button
                style={styles.button}
                mode="contained">Entrar</Button>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        marginTop: 20
    }
})