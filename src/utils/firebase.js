import firebase from 'firebase/app';
import "@firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBQ7E5oIiEH6j7vG_f5NNoXLYRa4fRme_8",
    authDomain: "gym-hamza.firebaseapp.com",
    projectId: "gym-hamza",
    storageBucket: "gym-hamza.appspot.com",
    messagingSenderId: "627807587752",
    appId: "1:627807587752:web:a0c99a65d65c62c91fe19d",
    measurementId: "G-TPJF533FRS"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
