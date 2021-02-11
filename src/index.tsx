import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyC3VrrCu2PeD4nQMDSCHsaZQ1rhUE7U03Y",
  authDomain: "arrangere-a8fca.firebaseapp.com",
  databaseURL:
    "https://arrangere-a8fca-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "arrangere-a8fca",
  storageBucket: "arrangere-a8fca.appspot.com",
  messagingSenderId: "453649241479",
  appId: "1:453649241479:web:6450f5d0d16186e1f2af22",
  measurementId: "G-5ZH2E86G8G",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
