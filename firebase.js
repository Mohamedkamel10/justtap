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

  document.getElementById("name").innerText = d.name || "";
  document.getElementById("job").innerText = d.job || "";
  document.getElementById("company").innerText = d.company || "";

  if (d.avatar) document.getElementById("avatar").src = d.avatar;
  if (d.cover) document.getElementById("cover").style.backgroundImage = `url('${d.cover}')`;

  d.email
    ? document.getElementById("emailBtn").href = `mailto:${d.email}`
    : document.getElementById("emailBtn").style.display = "none";

  d.phone
    ? document.getElementById("phoneBtn").href = `tel:${d.phone}`
    : document.getElementById("phoneBtn").style.display = "none";

  const socials = {
    whatsapp: d.whatsapp,
    facebook: d.facebook,
    instagram: d.instagram,
    snapchat: d.snapchat,
    tiktok: d.tiktok
  };

  const container = document.getElementById("socials");
  container.innerHTML = "";

  for (let k in socials) {
    if (socials[k]) {
      container.innerHTML += `
        <a href="${socials[k]}" target="_blank">
          <i class="fa-brands fa-${k}"></i>
        </a>
      `;
    }
  }
});
