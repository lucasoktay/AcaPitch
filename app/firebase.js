import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyD2-sRbPud08IjZCqVTg948ZJdhZ-0QJ8Q",
    authDomain: "acapitch-5c6c2.firebaseapp.com",
    databaseURL: "https://acapitch-5c6c2-default-rtdb.firebaseio.com",
    projectId: "acapitch-5c6c2",
    storageBucket: "acapitch-5c6c2.appspot.com",
    messagingSenderId: "656125188160",
    appId: "1:656125188160:web:01cf1f9fa74cf054a4e7a5",
    measurementId: "G-WNVQ20622X"
};

const app = initializeApp(firebaseConfig);

// const firestoreDB = initializeFirestore(firebaseApp, {
//     experimentalForceLongPolling: true, // this line
//     useFetchStreams: false, // and this line
// })

export const auth = getAuth(app);
export const firestore = getFirestore(app);