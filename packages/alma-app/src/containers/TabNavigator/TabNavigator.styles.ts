import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    safeAreaContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        left: 0
    },
    container: {
        position: 'relative',
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 60,
        shadowRadius: 10,
        shadowOpacity: 0.1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 }
    },
    innerContainer: {
        flex: 1,
        borderRadius: 60,
        overflow: 'hidden'
    },
    navigatorContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20
    },
    itemContainer: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 40
    },
    itemContainerCTA: {
        backgroundColor: '#000',
        paddingHorizontal: 32
    }
});
