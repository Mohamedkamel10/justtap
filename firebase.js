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
  alert("User not found in URL");
  throw new Error("No user param");
}

db.collection("users").doc(user).get()
.then(doc => {
  if (!doc.exists) {
    alert("User not found in Firestore");
    return;
  }

  const d = doc.data();

  setText("name", d.name);
  setText("job", d.job);
  setText("company", d.company);

  setImage("avatar", d.avatar);
  setCover("cover", d.cover);

  setLink("phoneBtn", d.phone, v => `tel:${v}`);
  setLink("emailBtn", d.email, v => `mailto:${v}`);

  const socials = {
    facebook: d.facebook,
    instagram: d.instagram,
    tiktok: d.tiktok,
    snapchat: d.snapchat
  };

  for (let k in socials) {
    if (socials[k]) {
      document.getElementById("socials").innerHTML += `
        <a href="${socials[k]}" target="_blank">
          <i class="fa-brands fa-${k}"></i>
        </a>
      `;
    }
  }
})
.catch(err => {
  console.error("Firestore error:", err);
});

// helpers
function setText(id, val) {
  const el = document.getElementById(id);
  if (el && val) el.innerText = val;
}

function setImage(id, val) {
  const el = document.getElementById(id);
  if (el && val) el.src = val;
}

function setCover(id, val) {
  const el = document.getElementById(id);
  if (el && val) el.style.backgroundImage = `url('${val}')`;
}

function setLink(id, val, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  if (val) el.href = fn(val);
  else el.style.display = "none";
}
