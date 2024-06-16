import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    fullscreen: {
        // flexGrow: 0,
        paddingTop: 64,
        paddingHorizontal: 20,
    },

    newsongscreen: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
        columnGap: 20,
        paddingVertical: 20,
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
        borderRadius: 20,
        overflow: 'hidden',
        flexGrow: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        marginVertical: 8
    },

    songwrapperleft: {
        // backgroundColor: 'grey',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
        width: 150
    },

    song: {
        fontSize: 22,
    },

    songlist: {
        // backgroundColor: 'blue',
        flexDirection: 'column',
        maxHeight: "60%",
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
        borderWidth: 1,
        height: 64,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 8,
        paddingLeft: 20,
    },

    navbar: {
        backgroundColor: '#EDECEA',
        position: 'absolute',
        bottom: 0,
        width: "100%",
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },

    bottomicons: {
        width: 64,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: "2%",
        marginHorizontal: "12.5%"
    },

    playicon: {
        borderWidth: 2,
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 0,
        borderRadius: 50,
        margin: 8
    },

    bottomline: {
        width: '104%',
        borderWidth: .5,
        borderColor: 'black',
        marginBottom: 16,
        marginLeft: '-2%',
    },

    fullscreenpiano: {
        marginVertical: "10%"
    },

    pianoscrollview: {
        marginTop: 30,
        marginBottom: 20,
        height: 200,
        flexGrow: 1,
    },

    pianowrapper: {
        width: 2250,
    },

    piano: {
    },

    cancelbutton: {
        marginTop: 20,
        marginLeft: 40,
        height: 20,
        width: 40,
    },

    inputfield: {
        height: 40,
        width: 240,
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 12,
        padding: 8,
        color: 'white'
    },

    addsonginputs: {
        marginTop: 20,
        flexDirection: 'column',
        rowGap: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },

    inputpiano: {
        height: 200,
        width: "100%",
        marginTop: 20,
        backgroundColor: 'blue',
        marginVertical: 10
    },

    bottombuttons: {
        width: "100%",
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    bottombutton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10,
        // backgroundColor: '#DBCCC9',
        marginBottom: 8
    },

    buttontext: {
        color: '#B79992',
        fontSize: 20,
        fontWeight: 'bold'
    },

    buttontextactive: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },

    addnotesbutton: {
        height: 40,
        width: 240,
        // borderWidth: 2,
        borderColor: 'white',
        borderRadius: 12,
        padding: 8,
        color: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DBCCC9',
    },

    addnotes: {
        marginLeft: -70,
        textAlign: 'center',
        lineHeight: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 20,
    },

    savesong: {
        textAlign: 'center',
        lineHeight: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 20,
    }
});

export default styles;