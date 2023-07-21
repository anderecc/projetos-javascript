// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import {
    GoogleAuthProvider,
    browserSessionPersistence,
    getAuth,
    setPersistence,
    signInWithPopup,
} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_APIKEY,
    authDomain: import.meta.env.VITE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_PROJECTID,
    storageBucket: import.meta.env.VITE_STORAGEBUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGINGSENDERID,
    appId: import.meta.env.VITE_APPID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = getAuth();

export const initAuth = () => {
    return new Promise((resolve, reject) => {
        setPersistence(auth, browserSessionPersistence).then(() => {
            if (auth.currentUser) {
                const user = auth.currentUser;
                const token = auth.currentUser.accessToken;
                resolve({ user, token });
            } else {
                const provider = new GoogleAuthProvider();
                signInWithPopup(auth, provider)
                    .then((res) => {
                        const user = res.user;
                        const token = res.user.accessToken;
                        resolve({ user, token });
                    })
                    .catch((err) => {
                        reject(err);
                    });
            }
        });
    });
};
