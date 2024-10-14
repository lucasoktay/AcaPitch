import { StyleSheet } from "react-native";
import colors from "./colors";

const shadow = {
    shadowColor: colors.grey,
    shadowOpacity: .2,
    shadowRadius: 6,
    shadowOffset: { height: 2 }
};

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
        paddingTop: 60,
        paddingBottom: 80,
    },

    fullscreensettings: {
        backgroundColor: colors.greyred,
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 20,
        alignItems: 'center',
    },

    topbarsettings: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        height: 40,
    },

    backbutton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        height: 40,
        width: 40,
        zIndex: 1,
        left: 20,
        top: 60,
    },

    themesbutton: {
        flexDirection: 'row',
        borderRadius: 10,
        alignItems: 'center',
        width: "100%",
        height: 50,
        marginVertical: 10,
        backgroundColor: "white"
    },

    themesicon: {
        marginHorizontal: 16,
        marginVertical: 8,
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
        marginRight: 20,
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
        justifyContent: 'flex-end',
        flexGrow: 0
    },

    yoursongs: {
        fontSize: 22,
        marginTop: 24,
        marginHorizontal: 20,
        marginBottom: 8,
        fontWeight: '500',
        flexGrow: 0,
        fontFamily: 'RubikRegular'
    },

    songwrapper: {
        height: 64,
        marginHorizontal: 15,
        borderWidth: .2,
        borderColor: colors.mediumlightgrey,
        borderRadius: 10,
        flexGrow: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 8,
        marginVertical: 8,
        marginHorizontal: 20,
        backgroundColor: 'white',
        ...shadow
    },

    songwrapperleft: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8,
        width: 150,
    },

    song: {
        fontSize: 20,
        fontFamily: 'RubikRegular'
    },

    songListScrollView: {
        flex: 1,
    },

    songlist: {
        flexDirection: 'column',
        overflow: 'scroll',
        flex: 1,
        // paddingBottom: 95,
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
        bottom: 90,
        left: 20,
        right: 20,
        height: 64,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: 20,
        backgroundColor: "white",
        ...shadow,
        zIndex: 999
    },

    youremail: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: "100%",
        marginBottom: 20,
        marginTop: 10
    },

    signuptext: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'RubikRegular',
        color: "white",
        marginBottom: 8,
        marginTop: 20
    },

    signupbutton: {
        backgroundColor: colors.orange,
        borderRadius: 40,
        width: "60%",
        height: 60,
        color: "white",
        fontSize: 16,
        fontFamily: 'RubikRegular',
        justifyContent: 'center',
        alignItems: 'center',
    },

    signupbuttoninactive: {
        backgroundColor: colors.grey,
        borderRadius: 40,
        width: "60%",
        height: 60,
        color: "white",
        fontSize: 16,
        fontFamily: 'RubikRegular',
        justifyContent: 'center',
        alignItems: 'center',
    },

    signoutbutton: {
        position: 'absolute',
        bottom: 60,
        backgroundColor: colors.lightred,
        borderwidth: 1,
        borderRadius: 40,
        width: "60%",
        height: 60,
        color: "white",
        fontSize: 16,
        fontFamily: 'RubikRegular',
        justifyContent: 'center',
        alignItems: 'center',
    },

    navbar: {
        backgroundColor: colors.navbar,
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
        // borderColor: colors.lightred,
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
        bottom: 0,
        left: 10,
        right: 10
    },

    fullscreenpiano: {
        height: "90%",
        marginTop: '5%',
        backgroundColor: colors.greyred,
    },

    pianoscrollview: {
        marginTop: 10,
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
        fontFamily: 'RubikRegular',
    },

    signupinputs: {
        borderRadius: 10,
        backgroundColor: colors.lightred,
        borderColor: colors.lightgrey,
        height: 56,
        fontSize: 16,
        fontFamily: 'RubikRegular',
        padding: 15,
        marginTop: 3,
        width: "100%"
    },

    signininputs: {
        borderRadius: 10,
        backgroundColor: colors.lightred,
        // borderWidth: 1,
        borderColor: colors.lightgrey,
        height: 56,
        fontSize: 16,
        fontFamily: 'RubikRegular',
        padding: 15,
        marginTop: 3,
        width: "100%"
    },

    logocontainer: {
        height: 60,
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    },

    signupcontainer: {
        paddingVertical: 50,
        paddingHorizontal: 20,
        flex: 1,
        height: "100%",
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red
    },

    signincontainer: {
        paddingVertical: 50,
        paddingHorizontal: 20,
        flex: 1,
        height: "100%",
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.red
    },

    signupinnercontainer: {
        width: "100%",
        justifyContent: 'center',
    },

    switchtext: {
        color: colors.lightorange,
        fontSize: 18,
        fontFamily: 'RubikRegular',
        marginTop: 10,
    },

    welcometext: {
        fontSize: 40,
        fontFamily: 'RubikRegular',
        color: "white",
        marginBottom: 20,
    },

    addsonginputs: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
        backgroundColor: colors.greyred,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '90%',
        maxHeight: '80%',
        backgroundColor: 'white',
        borderRadius: 20,
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        borderRadius: 10,
        marginBottom: 8,
        ...shadow,
    },

    noteinfo: {
        fontSize: 22,
        fontFamily: 'RubikRegular',
        width: "82%",
        marginTop: 10,
        // color: colors.orange
    },

    buttontext: {
        fontSize: 20,
        fontFamily: 'RubikRegular',
        fontWeight: 'bold'
    },

    buttontextactive: {
        color: 'white',
        fontSize: 20,
        fontFamily: 'RubikRegular',
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
        backgroundColor: colors.grey,
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
        backgroundColor: colors.lightred,
    },

    addnotes: {
        textAlign: 'center',
        lineHeight: 40,
        height: 40,
        alignItems: 'center',
        color: colors.darkgrey,
        justifyContent: 'center',
        fontSize: 16,
        fontFamily: 'RubikRegular',
    },

    savesong: {
        textAlign: 'center',
        lineHeight: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: 16,
        fontFamily: 'RubikRegular',
    },

    deletesongbutton: {
        height: 64,
        borderRadius: 20,
        width: 80,
        marginLeft: 12,
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightred
    }
});

export default styles;