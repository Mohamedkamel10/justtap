// Firebase
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
  alert("No user in URL");
}

// helpers
function setText(id, value) {
  const el = document.getElementById(id);
  if (el && value) el.innerText = value;
}

function setLink(id, link) {
  const el = document.getElementById(id);
  if (el && link) el.href = link;
}

window.onload = () => {
  db.collection("users").doc(username).get().then(doc => {
    if (!doc.exists) return;

    const data = doc.data();

    setText("name", data.name);
    setText("job", data.job);
    setText("company", data.company);

    setLink("phone", data.phone ? `tel:${data.phone}` : "");
    setLink("email", data.email ? `mailto:${data.email}` : "");

    // socials
    const socials = document.getElementById("socials");
    socials.innerHTML = "";

    const icons = {
      whatsapp: "fa-whatsapp",
      facebook: "fa-facebook-f",
      instagram: "fa-instagram",
      tiktok: "fa-tiktok",
      snapchat: "fa-snapchat"
    };

    Object.keys(icons).forEach(key => {
      if (data[key]) {
        socials.innerHTML += `
          <a href="${data[key]}" target="_blank">
            <i class="fa-brands ${icons[key]}"></i>
          </a>
        `;
      }
    });
  });
};
