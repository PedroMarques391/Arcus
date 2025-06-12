import React from "react";
import { StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";

export function SignUp(): React.JSX.Element {
    return (
        <>
            <TextInput
                label='nome'
                placeholder="John Doe"
                keyboardType="default"
                autoCapitalize="none"
                mode="outlined"
            />
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
                mode="contained">
                Criar Conta
            </Button>
        </>
    )
}


const styles = StyleSheet.create({
    button: {
        marginTop: 20
    }
})