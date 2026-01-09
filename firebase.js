firebase.initializeApp({
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
});

const db = firebase.firestore();

const user = new URLSearchParams(window.location.search).get("user");
console.log("USER:", user);

db.collection("users").doc(user).get()
.then(doc => {
  console.log("DOC EXISTS:", doc.exists);

  if (!doc.exists) {
    alert("User not found");
    return;
  }

  const d = doc.data();
  console.log("DATA:", d);

  document.getElementById("name").innerText = d.name || "";
  document.getElementById("job").innerText = d.job || "";
  document.getElementById("company").innerText = d.company || "";

 function el(id) {
  return document.getElementById(id);
}

if (el("cover") && d.cover) {
  el("cover").style.backgroundImage = `url('${d.cover}')`;
}

if (el("avatar") && d.avatar) {
  el("avatar").src = d.avatar;
}

if (el("phone")) {
  if (d.phone) el("phone").href = `tel:${d.phone}`;
  else el("phone").style.display = "none";
}

if (el("email")) {
  if (d.email) el("email").href = `mailto:${d.email}`;
  else el("email").style.display = "none";
}

      `;
    }
  });
})
.catch(err => {
  console.error("ERROR:", err);
});
