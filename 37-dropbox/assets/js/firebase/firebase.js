import { currentFolder } from '../main.js';

/* eslint-disable no-undef */
const firebaseConfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);

export let refDatabase = firebase.database().ref('HOME');

export const setRefDatabase = (path) => {
    if (!path) path = currentFolder.join('/');

    refDatabase = firebase.database().ref(path);
    return refDatabase;
};
