import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import FirebaseConfig from "../store/firebase.config";

firebase.initializeApp(FirebaseConfig);
// import "firebase/analytics";
// firebase.analytics();

const auth = firebase.auth;
const database = firebase.firestore();

export { firebase, auth, database };
