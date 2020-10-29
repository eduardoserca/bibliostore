import { createStore, combineReducers, compose } from 'redux';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer  } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

/** Custom Reducers**/
import buscarUsuarioReducer from './reducers/buscarUsuarioReducer';

//Configurar firestore
const firebaseConfig = {
    apiKey: "AIzaSyAv7V5oqqFqb2dKk9do6qTObTLueOqUuRo",
    authDomain: "bibliostore-34eaa.firebaseapp.com",
    databaseURL: "https://bibliostore-34eaa.firebaseio.com",
    projectId: "bibliostore-34eaa",
    storageBucket: "bibliostore-34eaa.appspot.com",
    messagingSenderId: "128645330351",
    appId: "1:128645330351:web:a282782cd52f2d097f6b5a",
    measurementId: "G-NDY6HS0Y5J"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
  }

//crear  el enhancer con compose de redux  y firestore
const createStoreWithFirebase = compose(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase)
  )(createStore);

//Reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    usuario: buscarUsuarioReducer
});

//state incial
const initialState = {}

//create el store
const store = createStoreWithFirebase(rootReducer,initialState,compose(
        reactReduxFirebase(firebase),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;

