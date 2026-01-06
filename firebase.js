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

  document.getElementById("name").innerText = d.name;
  document.getElementById("job").innerText = d.job;
  document.getElementById("company").innerText = d.company;

  document.getElementById("avatar").src = d.avatar;
  document.getElementById("cover").style.backgroundImage = `url(${d.cover})`;

  d.phone ? document.getElementById("phoneBtn").href = `tel:${d.phone}` : hide("phoneBtn");
  d.email ? document.getElementById("emailBtn").href = `mailto:${d.email}` : hide("emailBtn");

  const socials = {
    whatsapp: "fa-whatsapp",
    facebook: "fa-facebook",
    instagram: "fa-instagram",
    tiktok: "fa-tiktok",
    snapchat: "fa-snapchat"
  };

  for (let k in socials) {
    if (d[k]) {
      document.getElementById("socials").innerHTML += `
        <a href="${d[k]}" target="_blank">
          <i class="fa-brands ${socials[k]}"></i>
        </a>`;
    }
  }
});

function hide(id){
  document.getElementById(id).style.display = "none";
}
