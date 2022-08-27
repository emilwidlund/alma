import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 240,
        backgroundColor: '#fff',
        margin: 10,
        maxWidth: '45%',
        borderRadius: 14,
        shadowRadius: 10,
        shadowOpacity: 0.2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 }
    },
    media: {
        flexGrow: 1,
        backgroundColor: '#eee',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
    },
    textContent: {
        paddingHorizontal: 15,
        paddingVertical: 15,
        flexShrink: 1
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8
    },
    subTitle: {
        color: '#888'
    }
});
