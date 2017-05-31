// Importamos las librerias de firebase
import * as firebase from "firebase"

const config = {
  apiKey: "AIzaSyCqe_ve5j-r9erCclrrFoo-r3FwgsCjs-k",
  authDomain: "platzimusic-bd157.firebaseapp.com",
  databaseURL: "https://platzimusic-bd157.firebaseio.com",
  projectId: "platzimusic-bd157",
  storageBucket: "platzimusic-bd157.appspot.com",
  messagingSenderId: "195507945611"
};
firebase.initializeApp(config);

export const firebaseAuth = firebase.auth()
export const firebaseDatabase =  firebase.database()
export default firebase