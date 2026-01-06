firebase.initializeApp({
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e",
  storageBucket: "just-tap-4e85e.firebasestorage.app",
  messagingSenderId: "497081794470",
  appId: "1:497081794470:web:f14285e82562c2292d5967"
});

const db = firebase.firestore();

const user = new URLSearchParams(window.location.search).get("user");

if (!user) {
  alert("User not found");
  throw new Error("No user");
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

  document.getElementById("avatar").src = d.avatar;
  document.getElementById("cover").style.backgroundImage = `url(${d.cover})`;

  d.phone
    ? document.getElementById("phoneBtn").href = `tel:${d.phone}`
    : document.getElementById("phoneBtn").style.display="none";

  d.email
    ? document.getElementById("emailBtn").href = `mailto:${d.email}`
    : document.getElementById("emailBtn").style.display="none";

  const socials = {
    whatsapp:"fa-whatsapp",
    facebook:"fa-facebook",
    instagram:"fa-instagram",
    tiktok:"fa-tiktok",
    snapchat:"fa-snapchat"
  };

  for (let k in socials) {
    if (d[k]) {
      document.getElementById("socials").innerHTML += `
        <a href="${d[k]}" target="_blank">
          <i class="fa-brands ${socials[k]}"></i><br>${k}
        </a>`;
    }
  }
});
