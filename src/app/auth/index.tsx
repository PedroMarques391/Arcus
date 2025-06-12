import { KeyboardAvoidingView, Platform, Text, View } from "react-native";

export default function AuthPage() {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View>
                <Text>Criar Conta</Text>
            </View>
        </KeyboardAvoidingView>
    )
}