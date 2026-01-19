// ================= FIREBASE CONFIG =================
var firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e",
  storageBucket: "just-tap-4e85e.firebasestorage.app",
  messagingSenderId: "497081794470",
  appId: "1:497081794470:web:f14285e82562c2292d5967"
};

// ================= INIT FIREBASE =================
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// ================= GET USER FROM URL =================
const params = new URLSearchParams(window.location.search);
const username = params.get("user");

// ================= LOAD DATA =================
window.onload = function () {
  if (!username) {
    console.error("No user in URL");
    return;
  }

  db.collection("users").doc(username).get()
    .then((doc) => {
      if (!doc.exists) {
        console.error("User not found");
        return;
      }

      const data = doc.data();

      // ===== BASIC INFO =====
      document.getElementById("name").innerText = data.name || "";
      document.getElementById("job").innerText = data.job || "";
      document.getElementById("company").innerText = data.company || "";

        // ---------- Images (Assets فقط) ----------
      document.getElementById("avatar").src =
        "assets/images/avatar.jpg";

      document.getElementById("cover").style.backgroundImage =
        "url('assets/images/cover.jpg')";
      // ===== ACTION BUTTONS =====
      if (data.phone) {
        const phone = document.getElementById("phone");
        phone.href = "tel:" + data.phone;
        phone.style.display = "flex";
      }

      if (data.email) {
        const email = document.getElementById("email");
        email.href = "mailto:" + data.email;
        email.style.display = "flex";
      }

      const socials = document.getElementById("socials");
socials.innerHTML = "";

function addSocial(icon, link) {
  const a = document.createElement("a");
  a.href = link;
  a.target = "_blank";

  const i = document.createElement("i");
  i.className = `fa-brands fa-${icon}`;

  a.appendChild(i);
  socials.appendChild(a);
}

if (data.facebook) {
  addSocial("facebook", data.facebook);
}

if (data.instagram) {
  addSocial("instagram", data.instagram);
}

if (data.snapchat) {
  addSocial("snapchat", data.snapchat);
}
      if (data.tiktok) {
  addSocial("tiktok", data.tiktok);
}

    })
    .catch((error) => {
      console.error("Firestore error:", error);
    });
};
