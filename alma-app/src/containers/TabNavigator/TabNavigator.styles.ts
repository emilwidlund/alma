import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeAreaContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 100,
        shadowRadius: 10,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 }
    },
    itemContainer: {
        paddingVertical: 6,
        borderRadius: 40
    },
    itemContainerCTA: {
        backgroundColor: '#000',
        paddingHorizontal: 32
    }
});
