// Firebase config
firebase.initializeApp({
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
});

const db = firebase.firestore();

// get user from URL
const user = new URLSearchParams(window.location.search).get("user");
if (!user) {
  alert("User not found");
  throw new Error("No user in URL");
}

// helper
function el(id) {
  return document.getElementById(id);
}

// get data
db.collection("users").doc(user).get().then(doc => {
  if (!doc.exists) {
    alert("User not found in Firestore");
    return;
  }

  const d = doc.data();

  // text
  if (el("name")) el("name").innerText = d.name || "";
  if (el("job")) el("job").innerText = d.job || "";
  if (el("company")) el("company").innerText = d.company || "";

  // images
  if (el("avatar") && d.avatar) el("avatar").src = d.avatar;
  if (el("cover") && d.cover)
    el("cover").style.backgroundImage = `url('${d.cover}')`;

  // email
  if (el("email")) {
    if (d.email) el("email").href = `mailto:${d.email}`;
    else el("email").style.display = "none";
  }

  // phone
  if (el("phone")) {
    if (d.phone) el("phone").href = `tel:${d.phone}`;
    else el("phone").style.display = "none";
  }

  // socials
  const socials = {
    facebook: "fa-facebook",
    instagram: "fa-instagram",
    tiktok: "fa-tiktok",
    snapchat: "fa-snapchat",
    whatsapp: "fa-whatsapp"
  };

  if (el("socials")) {
    for (let key in socials) {
      if (d[key]) {
        el("socials").innerHTML += `
          <a href="${d[key]}" target="_blank">
            <i class="fa-brands ${socials[key]}"></i>
          </a>
        `;
      }
    }
  }
}).catch(err => {
  console.error("Firestore error:", err);
});
