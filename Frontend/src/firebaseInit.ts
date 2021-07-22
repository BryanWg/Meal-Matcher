import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export default function firebaseInit() {
    if (!firebase.apps.length) {
        firebase.initializeApp({
            apiKey: 'AIzaSyAfFtcssI2zSi9X8lL_yDXMGmHUKfVPJcs',
            authDomain: 'meal-match-e4186.firebaseapp.com',
            projectId: 'meal-match-e4186',
            storageBucket: 'meal-match-e4186.appspot.com',
            messagingSenderId: '528778567537',
            appId: '1:528778567537:web:e9ec5cf38d4c465b8ae0d0',
            measurementId: 'G-ZRF1SCZG8K'
        });
    } else {
        firebase.app(); // if already initialized, use that one
    }
}
