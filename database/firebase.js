import firebase from 'firebase';

import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCL5ezTjbr1h3-pu6vhIKnqyXEDtK3cU94",
    authDomain: "tdm-react-native.firebaseapp.com",
    projectId: "tdm-react-native",
    storageBucket: "tdm-react-native.appspot.com",
    messagingSenderId: "150449439362",
    appId: "1:150449439362:web:f6aacaf4ca63bb5ad92a9b",
    measurementId: "G-5MJGPVP95T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const fireDb = firebase.firestore();

export default {
    firebase,
    fireDb
};
