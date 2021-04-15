import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC3VrrCu2PeD4nQMDSCHsaZQ1rhUE7U03Y",
  authDomain: "arrangere-a8fca.firebaseapp.com",
  databaseURL:
    "https://arrangere-a8fca-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "arrangere-a8fca",
  storageBucket: "arrangere-a8fca.appspot.com",
  messagingSenderId: "453649241479",
  appId: "1:453649241479:web:6450f5d0d16186e1f2af22",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
export const auth = app.auth();

if (window.location.hostname === "localhost") {
/*if (location.hostname === "localhost") {
  firestore.useEmulator("localhost", 8080);
  firebase
    .auth()
    .useEmulator("http://localhost:9099/", { disableWarnings: true });
}*/
  
}

}

export default app;
