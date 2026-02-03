// admin.js
import { db } from "./firebase.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"; 


const form = document.getElementById("adminForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("Username required");
    return;
  }

  const data = {
    name: document.getElementById("name").value,
    job: document.getElementById("job").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    socials: {
      instagram: document.getElementById("instagram").value,
      whatsapp: document.getElementById("whatsapp").value,
      snapchat: document.getElementById("snapchat").value,
      facebook: document.getElementById("facebook").value,
      tiktok: document.getElementById("tiktok").value,
      twitter: document.getElementById("twitter").value,
      linkedin: document.getElementById("linkedin").value,
      
    }
    createdAt: Date.now()
  };

  try {
    await setDoc(doc(db, "users", username), data);
    alert("✅ Saved successfully");
  } catch (err) {
    console.error(err);
    alert("❌ Error saving");
  }
});
