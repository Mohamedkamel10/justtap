import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* Load User Data */
async function loadUser() {
  const userRef = doc(db, "users", "mohamed");
  const snap = await getDoc(userRef);

  if (!snap.exists()) return;

  const user = snap.data();

  // text data
  document.getElementById("name").innerText = user.name;
  document.getElementById("job").innerText = user.job;
  document.getElementById("company").innerText = user.company;

  // social links
  document.getElementById("facebook").onclick = () =>
    openLink(user.facebook);

  document.getElementById("instagram").onclick = () =>
    openLink(user.instagram);

  document.getElementById("tiktok").onclick = () =>
    openLink(user.tiktok);

  document.getElementById("snapchat").onclick = () =>
    openLink(user.snapchat);

  // phone & email
  document.getElementById("phone").onclick = () =>
    openLink(`tel:${user.phone}`);

  document.getElementById("email").onclick = () =>
    openLink(`mailto:${user.email}`);
}

/* Open link safely */
function openLink(url) {
  if (!url) return;
  window.open(url, "_blank");
}

loadUser();
