import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

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

const socialRow = document.getElementById("socialRow");

const socials = [
  { key: "whatsapp", name: "WhatsApp", icon: "fa-whatsapp", color: "#25D366" },
  { key: "facebook", name: "Facebook", icon: "fa-facebook-f", color: "#1877F2" },
  { key: "instagram", name: "Instagram", icon: "fa-instagram", color: "#E4405F" },
  { key: "tiktok", name: "TikTok", icon: "fa-tiktok", color: "#000000" },
  { key: "snapchat", name: "Snapchat", icon: "fa-snapchat", color: "#FFFC00" }
];

async function loadUserSocial() {
  const userRef = doc(db, "users", "mohamed");
  const snap = await getDoc(userRef);

  if (!snap.exists()) return;

  const data = snap.data();
  const available = socials.filter(s => data[s.key]);

  available.forEach((s, index) => {
    const a = document.createElement("a");
    a.href = data[s.key];
    a.target = "_blank";
    a.className = "social-item";

    if (available.length % 3 === 1 && index === available.length - 1) {
      a.classList.add("center");
    }

    a.innerHTML = `
      <div class="social-icon">
        <i class="fa-brands ${s.icon}" style="color:${s.color}"></i>
      </div>
      <span>${s.name}</span>
    `;

    socialRow.appendChild(a);
  });
}

loadUserSocial();
