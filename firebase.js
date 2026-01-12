// ================= Firebase Config =================
var firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e",
  messagingSenderId: "497081794470",
  appId: "1:497081794470:web:f14285e82562c2292d5967"
};

// ================= Init Firebase =================
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// ================= Get user from URL =================
const params = new URLSearchParams(window.location.search);
const username = params.get("user");

// ================= Load Data =================
window.onload = function () {

  if (!username) {
    console.error("❌ No user in URL");
    return;
  }

  db.collection("users").doc(username).get()
    .then((doc) => {

      if (!doc.exists) {
        console.error("❌ User not found");
        return;
      }

      const d = doc.data();

      // ---------- Text ----------
      document.getElementById("name").innerText = d.name || "";
      document.getElementById("job").innerText = d.job || "";
      document.getElementById("company").innerText = d.company || "";

      // ---------- Images (Assets فقط) ----------
      document.getElementById("avatar").src =
        "assets/images/avatar.jpg";

      document.getElementById("cover").style.backgroundImage =
        "url('assets/images/cover.jpg')";

      // ---------- Email ----------
      const emailEl = document.getElementById("email");
      if (d.email) {
        emailEl.href = `mailto:${d.email}`;
        emailEl.style.display = "flex";
      } else {
        emailEl.style.display = "none";
      }

      // ---------- Phone ----------
      const phoneEl = document.getElementById("phone");
      if (d.phone) {
        phoneEl.href = `tel:${d.phone}`;
        phoneEl.style.display = "flex";
      } else {
        phoneEl.style.display = "none";
      }

      // ---------- Social Links ----------
      const socialsDiv = document.getElementById("socials");
      socialsDiv.innerHTML = "";

      const socials = {
        facebook: d.facebook,
        instagram: d.instagram,
        snapchat: d.snapchat,
        tiktok: d.tiktok
      };

      for (let key in socials) {
        if (socials[key]) {
          socialsDiv.innerHTML += `
            <a href="${socials[key]}" target="_blank">
              <i class="fa-brands fa-${key}"></i>
            </a>
          `;
        }
      }

    })
    .catch((err) => {
      console.error("🔥 Firestore Error:", err);
    });
};
