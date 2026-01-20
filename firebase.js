import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase Config (حط بتاعك)
const firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e",
  storageBucket: "just-tap-4e85e.firebasestorage.app",
  messagingSenderId: "497081794470",
  appId: "1:497081794470:web:f14285e82562c2292d5967"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🧠 USER ID
const userId = "mohamed"; // نفس doc id في Firestore

async function loadUser() {
  const ref = doc(db, "users", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    alert("User not found");
    return;
  }

  const data = snap.data();

  document.getElementById("name").textContent = data.name;
  document.getElementById("job").textContent = data.job;

  document.getElementById("phoneBtn").href = `tel:${data.phone}`;
  document.getElementById("emailBtn").href = `mailto:${data.email}`;

  const socialsDiv = document.getElementById("socials");
  socialsDiv.innerHTML = "";

  for (const key in data.socials) {
    const a = document.createElement("a");
    a.href = data.socials[key];
    a.target = "_blank";

    let icon = "";
    if (key === "facebook") icon = "fa-facebook-f";
    if (key === "instagram") icon = "fa-instagram";
    if (key === "whatsapp") icon = "fa-whatsapp";
    if (key === "twitter") icon = "fa-x-twitter";
    if (key === "snapchat") icon = "fa-snapchat";

    a.innerHTML = `<i class="fa-brands ${icon}"></i>`;
    socialsDiv.appendChild(a);
  }
}

loadUser();
