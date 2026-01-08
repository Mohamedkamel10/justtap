firebase.initializeApp({
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
});

const db = firebase.firestore();

const params = new URLSearchParams(window.location.search);
const user = params.get("user");

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
  console.log("USER DATA:", d); // مهم جدًا

  setText("name", d.name);
  setText("job", d.job);
  setText("company", d.company);

  setImage("avatar", d.avatar);
  setCover("cover", d.cover);

  setLink("phoneBtn", d.phone, v => `tel:${v}`);
  setLink("emailBtn", d.email, v => `mailto:${v}`);

  const socialsMap = {
    facebook: "fa-facebook",
    instagram: "fa-instagram",
    tiktok: "fa-tiktok",
    snapchat: "fa-snapchat",
    whatsapp: "fa-whatsapp"
  };

  const socialsDiv = document.getElementById("socials");
  socialsDiv.innerHTML = "";

  for (let key in socialsMap) {
    if (d[key]) {
      socialsDiv.innerHTML += `
        <a href="${d[key]}" target="_blank">
          <i class="fa-brands ${socialsMap[key]}"></i>
        </a>
      `;
    }
  }
})
.catch(err => {
  console.error("Firestore error:", err);
});

function setText(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerText = val || "";
}

function setImage(id, val) {
  const el = document.getElementById(id);
  if (el && val) el.src = val;
}

function setCover(id, val) {
  const el = document.getElementById(id);
  if (el && val) el.style.backgroundImage = `url("${val}")`;
}

function setLink(id, val, fn) {
  const el = document.getElementById(id);
  if (!el) return;
  if (val) el.href = fn(val);
  else el.style.display = "none";
}
