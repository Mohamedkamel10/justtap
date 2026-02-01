// Firebase v9+
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyDD2mzGNR3gKwn-hCkQDkUE729sC8BnqVc",
  authDomain: "justtap-c7fde.firebaseapp.com",
  projectId: "justtap-c7fde",
  storageBucket: "justtap-c7fde.appspot.com",
  messagingSenderId: "467024881082",
  appId: "1:467024881082:web:5d88dbba462c9dc999a983"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

// رفع صورة
export async function uploadImage(file, path) {
  const imageRef = ref(storage, path);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
}

// حفظ يوزر
export async function saveUser(username, data) {
  await setDoc(doc(db, "users", username), data);
}

// جلب يوزر
export async function getUser(username) {
  const snap = await getDoc(doc(db, "users", username));
  return snap.exists() ? snap.data() : null;
}
