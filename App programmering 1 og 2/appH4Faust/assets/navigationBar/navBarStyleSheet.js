import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    navContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: '8%',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: '#f6f6fa'
    },

    navBtns: {
        height: '90%',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 3,
        marginBottom: 3,
        marginLeft: 50,
        borderWidth: 2,
        borderRadius: 15
    },

    navBtnsText: {
        fontSize: 12,
        color: 'black'
    },
});