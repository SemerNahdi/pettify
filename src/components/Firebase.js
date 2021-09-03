// @flow
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const config = {
    apiKey: "AIzaSyCE3r7Q2qAWXb1sS483sG-lWew6-EEx6pI",
    authDomain: "pet-care-b43dd.firebaseapp.com",
    projectId: "pet-care-b43dd",
    storageBucket: "pet-care-b43dd.appspot.com",
    messagingSenderId: "729760486188",
    appId: "1:729760486188:web:d0a0705a3d6aa63cccd289",
    measurementId: "G-9P2VHBCKJX"
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
