import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';

export function LoadingScreen(): React.JSX.Element {
    return (
        <LinearGradient
            colors={['#00BFFF', '#8A2BE2']}
            style={styles.container}
        >
            <ActivityIndicator size={100} color="#fff" />
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },



});
