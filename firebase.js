// 🔹 Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e",
  storageBucket: "just-tap-4e85e.firebasestorage.app",
  messagingSenderId: "497081794470",
  appId: "1:497081794470:web:f14285e82562c2292d5967"
};

// 🔹 Init Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// 🔹 Get username from URL
const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (!username) {
  console.error("No user in URL");
}

// 🔹 Load user data
window.onload = function () {

  // ✅ صور ثابتة من assets (مش من Firestore)
  document.getElementById("avatar").src =
    "https://raw.githubusercontent.com/Mohamedkamel10/justtap/main/assets/images/avatar.jpg";

  document.getElementById("cover").style.backgroundImage =
    "url('https://raw.githubusercontent.com/Mohamedkamel10/justtap/main/assets/images/cover.jpg')";

  db.collection("users").doc(username).get()
    .then((doc) => {
      if (!doc.exists) {
        console.error("User not found");
        return;
      }

      const data = doc.data();

      // Basic info
      document.getElementById("name").innerText = data.name || "";
      document.getElementById("job").innerText = data.job || "";
      document.getElementById("company").innerText = data.company || "";

      // Actions
      if (data.email) {
        document.getElementById("email").href = `mailto:${data.email}`;
      }

      if (data.phone) {
        document.getElementById("phone").href = `tel:${data.phone}`;
      }

      // Social links
      const socialsDiv = document.getElementById("socials");
      socialsDiv.innerHTML = "";

      if (data.socials) {
        Object.keys(data.socials).forEach((key) => {
          const link = document.createElement("a");
          link.href = data.socials[key];
          link.target = "_blank";
          link.innerHTML = `<i class="fa-brands fa-${key}"></i>`;
          socialsDiv.appendChild(link);
        });
      }
    .catch((err) => {
      console.error("Firestore error:", err);
    });
};

// 🔹 Helper function
function addSocial(name, url) {
  const socialsDiv = document.getElementById("socials");
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.innerHTML = `<i class="fa-brands fa-${name}"></i>`;
  socialsDiv.appendChild(link);
}
