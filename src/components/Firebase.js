// @flow
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyDgjlwvunby9HGz2Ta9U54QrofJygdHITk",
    authDomain: "pet-care-71816.firebaseapp.com",
    projectId: "pet-care-71816",
    storageBucket: "pet-care-71816.appspot.com",
    messagingSenderId: "42465066973",
    appId: "1:42465066973:web:9966a68e49db0856950034",
    measurementId: "G-EZ517186ML",
};

export default class Firebase {
    static firestore: firebase.firestore.Firestore;
    static auth: firebase.auth.Auth;
    static storage: firebase.storage.Storage;

    static init() {
        firebase.initializeApp(config);
        Firebase.auth = firebase.auth();
        Firebase.firestore = firebase.firestore();
        Firebase.storage = firebase.storage();
    }
}
