// Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// get username from url
const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (!username) {
  console.error("No user found in URL");
}

window.onload = function () {
  db.collection("users").doc(username).get().then((doc) => {
    if (!doc.exists) {
      console.error("User not found");
      return;
    }

    const data = doc.data();

    document.getElementById("name").innerText = data.name || "";
    document.getElementById("job").innerText = data.job || "";

    if (data.phone) {
      document.getElementById("phone").href = `tel:${data.phone}`;
    }

    if (data.email) {
      document.getElementById("email").href = `mailto:${data.email}`;
    }

    // socials
    var firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

const params = new URLSearchParams(window.location.search);
const username = params.get("user");

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

      // ✅ name + job
      document.getElementById("name").innerText = data.name || "";
      document.getElementById("job").innerText = data.job || "";

      // ✅ phone
      if (data.phone) {
        document.getElementById("phone").href =
          "tel:" + data.phone.replace(/\s+/g, '');
      }

      // ✅ email
      if (data.email) {
        document.getElementById("email").href =
          "mailto:" + data.email.trim();
      }

      // ✅ SOCIAL ICONS
      const socialsDiv = document.getElementById("socials");
      socialsDiv.innerHTML = "";

      const socialMap = {
        facebook: "fa-facebook-f",
        instagram: "fa-instagram",
        whatsapp: "fa-whatsapp",
        snapchat: "fa-snapchat",
        tiktok: "fa-tiktok"
      };

      Object.keys(socialMap).forEach(key => {

        if (!data[key]) return;

        let url = data[key];

        // يحل مشكلة الروابط اللي بدون https
        if (!url.startsWith("http")) {
          url = "https://" + url;
        }

        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";

        a.innerHTML =
          `<i class="fa-brands ${socialMap[key]}"></i>`;

        socialsDiv.appendChild(a);
      });

    })
    .catch(err => {
      console.error("Firestore error:", err);
    });
};

  });
};
