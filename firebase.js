firebase.initializeApp({
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
});

const db = firebase.firestore();

const user = new URLSearchParams(window.location.search).get("user");
if (!user) {
  alert("User not found");
  throw "";
}

db.collection("users").doc(user).get().then(doc => {
  if (!doc.exists) {
    alert("User not found");
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
    whatsapp: d.whatsapp,
    facebook: d.facebook,
    instagram: d.instagram,
    tiktok: d.tiktok,
    snapchat: d.snapchat
  };

  for (let k in socials) {
    if (socials[k]) {
      document.getElementById("socials").innerHTML += `
        <a href="${socials[k]}" target="_blank">${k}</a>
      `;
    }
  }
});

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
