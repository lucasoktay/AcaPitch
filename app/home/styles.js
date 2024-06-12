import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fullscreen: {
        flexGrow: 1,
        // backgroundColor: 'grey',
        paddingTop: 64,
        paddingHorizontal: 20,
    },

    searchbar: {
        // backgroundColor: 'blue',
        borderWidth: 1,
        height: 40,
        width: "85%",
        borderRadius: 20,
        overflow: 'hidden',
        flexGrow: 0,
        paddingLeft: 16,
        justifyContent: 'center',
    },

    settingsicon: {
        // backgroundColor: 'blue',
        borderWidth: 1,
        height: 40,
        width: 40,
        borderRadius: 20,
        overflow: 'hidden',
        flexGrow: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },

    topbar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 0
    },

    yoursongs: {
        fontSize: 24,
        marginVertical: 24,
        fontWeight: '700',
        flexGrow: 0
    },

    songwrapper: {
        // backgroundColor: 'red',
        borderWidth: 1,
        height: 64,
        borderRadius: 10,
        overflow: 'hidden',
        flexGrow: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        marginVertical: 4
    },

    songwrapperleft: {
        // backgroundColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
        width: 200
    },

    song: {
        fontSize: 22,
    },

    songlist: {
        // backgroundColor: 'blue',
        flexDirection: 'column',
        height: 424,
        overflow: 'scroll',
        flexGrow: 0,
    },

    songinfo: {
        // backgroundColor: 'blue',
        height: 64,
        width: 120,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'column',
        padding: 8
    },

    plusbutton: {
        // backgroundColor: 'blue',
        borderWidth: 1,
        height: 64,
        width: 64,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 0,
        borderRadius: "50%",
        marginTop: 32
    },

    navbar: {
        // backgroundColor: 'blue',
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 32
    },

    bottomicons: {
        width: 64,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1
    },

    playicon: {
        borderWidth: 2,
        height: 48,
        width: 48,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 0,
        borderRadius: "50%",
        margin: 8
    },

    bottomline: {
        width: '104%',
        borderWidth: .5,
        borderColor: 'black',
        marginLeft: '-2%',
    }
});

export default styles;