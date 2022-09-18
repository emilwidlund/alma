import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 400,
        backgroundColor: '#f8f8f8',
        margin: 10,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, .05)'
    },
    media: {
        flexGrow: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14
    },
    textContent: {
        padding: 20,
        flexShrink: 1
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 14
    },
    subTitle: {
        color: '#888'
    }
});
