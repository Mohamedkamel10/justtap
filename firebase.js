firebase.initializeApp({
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
});

const db = firebase.firestore();

const params = new URLSearchParams(window.location.search);
const user = params.get("user");

if (!user) {
  alert("User not found");
  throw new Error("Missing user param");
}

function el(id) {
  return document.getElementById(id);
}

db.collection("users").doc(user).get()
.then(function(doc) {

  if (!doc.exists) {
    alert("User not found in Firestore");
    return;
  }

  const d = doc.data();

  if (el("name")) el("name").innerText = d.name || "";
  if (el("job")) el("job").innerText = d.job || "";
  if (el("company")) el("company").innerText = d.company || "";

  if (el("avatar") && d.avatar) el("avatar").src = d.avatar;
  if (el("cover") && d.cover) {
    el("cover").style.backgroundImage = "url('" + d.cover + "')";
  }

  if (el("email")) {
    if (d.email) el("email").href = "mailto:" + d.email;
    else el("email").style.display = "none";
  }

  if (el("phone")) {
    if (d.phone) el("phone").href = "tel:" + d.phone;
    else el("phone").style.display = "none";
  }

  const icons = {
    facebook: "fa-facebook",
    instagram: "fa-instagram",
    tiktok: "fa-tiktok",
    snapchat: "fa-snapchat",
    whatsapp: "fa-whatsapp"
  };

  if (el("socials")) {
    for (let key in icons) {
      if (d[key]) {
        el("socials").innerHTML +=
          '<a href="' + d[key] + '" target="_blank">' +
          '<i class="fa-brands ' + icons[key] + '"></i>' +
          '</a>';
      }
    }
  }

})
.catch(function(err) {
  console.error("Firestore error:", err);
});
