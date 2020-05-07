import * as firebase from 'firebase'
import {FirebaseConfig} from '../config/dev.js';
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const todosRef = databaseRef.child("white-boardss")

export const timeStamp = firebase.database.ServerValue.TIMESTAMP