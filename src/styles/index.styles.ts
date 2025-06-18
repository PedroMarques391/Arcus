import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24
    },
    title: {
        fontWeight: 'bold'
    },
    card: {
        marginBottom: 18,
        borderRadius: 18,
        shadowColor: ' #000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4
    },
    cardContent: {
        padding: 20,

    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#22223b',
    },
    cardDescription: {
        fontSize: 15,
        marginBottom: 16,
        color: '#6c6c80',
        textTransform: "capitalize",
    },
    cardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    streakBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff3r0',
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    streakText: {
        marginLeft: 6,
        color: '#ff9800',
        fontWeight: 'bold',
        fontSize: 14
    },
    frequencyBadge: {
        backgroundColor: '#ede7f6',
        borderRadius: 12,
        paddingHorizontal: 12,
        paddingVertical: 4
    },
    frequencyText: {
        color: '#7c4dff',
        fontWeight: 'bold',
        fontSize: 14
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyStateText: {
        color: '#666'
    },
    swipeActionRight: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1,
        backgroundColor: '#00ca22',
        borderRadius: 18,
        marginBottom: 18,
        marginTop: 2,
        paddingRight: 16
    },
    swipeActionLeft: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flex: 1,
        backgroundColor: '#bf0a0a',
        borderRadius: 18,
        marginBottom: 18,
        marginTop: 2,
        paddingLeft: 16
    },
    cardCompleted: {
        opacity: 0.8
    },
    cardTextCompleted: {
        textDecorationLine: 'line-through'
    }
});