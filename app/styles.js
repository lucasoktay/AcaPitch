import { StyleSheet } from "react-native";
import colors from "./colors";

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
        paddingBottom: 80,
        paddingTop: 60,
        paddingHorizontal: 20,
    },

    searchbar: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        height: 40,
        width: "85%",
        borderRadius: 20,
        overflow: 'hidden',
        flexGrow: 0,
        paddingLeft: 16,
        columnGap: 8
    },

    settingsicon: {
        // borderWidth: 1,
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
        marginTop: 24,
        marginBottom: 8,
        fontWeight: '500',
        flexGrow: 0,
    },

    songwrapper: {
        borderWidth: 1,
        height: 64,
        borderRadius: 20,
        overflow: 'hidden',
        flexGrow: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        marginVertical: 8,
        borderColor: colors.darkgrey
    },

    songwrapperleft: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
        width: 150,
    },

    song: {
        fontSize: 22,
        color: colors.darkgrey
    },

    songListScrollView: {
        flex: 1,
    },

    songlist: {
        flexDirection: 'column',
        overflow: 'scroll',
        flex: 1,
        paddingBottom: 95,
    },

    songinfo: {
        height: 64,
        width: 120,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'column',
        padding: 8
    },

    plusbutton: {
        position: 'absolute',
        bottom: 15,
        left: 0,
        right: 0,
        height: 64,
        borderWidth: 1,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        zIndex: 999, // Ensure it's above other content but below the navbar
    },

    youremail: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "100%",
        marginBottom: 20,
    },

    signuptext: {
        fontSize: 30,
        fontWeight: 'bold',
        color: "white",
        marginBottom: 8,
    },

    signupbutton: {
        backgroundColor: colors.orange,
        borderRadius: 40,
        width: "60%",
        height: 60,
        color: "white",
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    signoutbutton: {
        backgroundColor: colors.lightred,
        borderwidth: 1,
        borderRadius: 40,
        width: "60%",
        height: 60,
        color: "white",
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    navbar: {
        backgroundColor: colors.bone,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        zIndex: 1000
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

    topline: {
        width: '104%',
        borderWidth: .5,
        borderColor: 'black',
        marginLeft: '-2%',
    },

    bottomline: {
        borderWidth: .5,
        borderColor: 'black',
        position: 'absolute',
        bottom: 175,
        left: 10,
        right: 10
    },

    fullscreenpiano: {
        height: "90%",
        marginTop: '5%'
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
        // padding: 8,
        color: 'black',
        fontSize: 18,
    },

    signupinputs: {
        borderRadius: 10,
        backgroundColor: colors.red,
        // borderWidth: 1,
        borderColor: colors.lightgrey,
        height: 56,
        fontSize: 16,
        padding: 15,
        marginTop: 3,
        width: "100%"
    },

    logocontainer: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },

    signupcontainer: {
        paddingVertical: 50,
        paddingHorizontal: 20,
        flex: 1,
        height: "100%",
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightred
    },

    signupinnercontainer: {
        width: "100%",
        justifyContent: 'center',
    },

    switchtext: {
        color: colors.lightorange,
        fontSize: 18,
        marginTop: 20,
    },

    welcometext: {
        fontSize: 40,
        color: "white",
        marginBottom: 20,
    },

    addsonginputs: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
    },

    newsongline: {
        height: .5,
        backgroundColor: colors.lightgrey,
        marginTop: 8,
        width: "120%",
        marginLeft: "-10%",
    },

    inputpiano: {
        height: 200,
        width: "100%",
        marginTop: 20,
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
        marginBottom: 8
    },

    buttontext: {
        color: colors.lightred,
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
        borderColor: colors.lightgrey,
        borderRadius: 12,
        flexDirection: 'row',
        padding: 8,
        columnGap: 8,
        alignItems: 'center',
    },

    savesongbutton: {
        height: 40,
        width: 40,
        borderColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        flexDirection: 'row',
        backgroundColor: colors.lightorange,
    },

    savesongbuttonactive: {
        height: 40,
        width: 40,
        borderColor: 'white',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        flexDirection: 'row',
        backgroundColor: colors.orange,
    },

    addnotes: {
        textAlign: 'center',
        lineHeight: 40,
        height: 40,
        alignItems: 'center',
        color: colors.darkgrey,
        justifyContent: 'center',
        fontSize: 16,
    },

    savesong: {
        textAlign: 'center',
        lineHeight: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 16,
    },

    deletesongbutton: {
        height: 64,
        borderRadius: 20,
        width: 80,
        marginLeft: 12,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red
    }
});

export default styles;