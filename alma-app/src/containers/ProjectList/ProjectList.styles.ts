import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        marginHorizontal: 'auto'
    },
    headingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginVertical: 30
    },
    title: {
        fontSize: 32,
        fontWeight: '600',
        marginLeft: 16
    }
});
