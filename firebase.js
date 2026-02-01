// Firebase config (الجديد)
var firebaseConfig = {
  apiKey: "AIzaSyDD2mzGNR3gKwn-hCkQDkUE729sC8BnqVc",
  authDomain: "justtap-c7fde.firebaseapp.com",
  projectId: "justtap-c7fde"
};

// يمنع duplicate-app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();

// icon mapping
const iconMap = {
  facebook: "facebook-f",
  instagram: "instagram",
  snapchat: "snapchat",
  tiktok: "tiktok",
  whatsapp: "whatsapp",
  linkedin: "linkedin-in"
};

// get user from URL
const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (!username) {
  alert("No user in URL");
}

db.collection("users").doc(username).get().then(doc => {
  if (!doc.exists) {
    alert("User not found");
    return;
  }

  const data = doc.data();

  // name & job
  document.getElementById("name").textContent = data.name || "";
  document.getElementById("job").textContent =
    `${data.job || ""}${data.company ? " - " + data.company : ""}`;

  // phone
  if (data.phone) {
    document.getElementById("phone").href = `tel:${data.phone}`;
  }

  // email
  if (data.email) {
    document.getElementById("email").href = `mailto:${data.email}`;
  }

  // socials
  const socialsDiv = document.getElementById("socials");
  socialsDiv.innerHTML = "";

  if (data.socials) {
    Object.keys(data.socials).forEach(key => {
      const url = data.socials[key];
      if (!url) return;

      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      const icon = iconMap[key] || key;
      a.innerHTML = `<i class="fa-brands fa-${icon}"></i>`;

      socialsDiv.appendChild(a);
    });
  }
});

