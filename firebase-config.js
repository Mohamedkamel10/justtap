// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDD2mzGNR3gKwn-hCkQDkUE729sC8BnqVc",
  authDomain: "justtap-c7fde.firebaseapp.com",
  projectId: "justtap-c7fde"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
