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

  if (d.avatar) document.getElementById("avatar").src = d.avatar;
  if (d.cover) document.getElementById("cover").style.backgroundImage = `url('${d.cover}')`;

  if (d.phone) document.getElementById("phone").href = `tel:${d.phone}`;
  else document.getElementById("phoneBtn").style.display = "none";

  if (d.email) document.getElementById("email").href = `mailto:${d.email}`;
  else document.getElementById("emailBtn").style.display = "none";

  const socials = ["facebook","instagram","tiktok","snapchat"];
  socials.forEach(s => {
    if (d[s]) {
      document.getElementById("socials").innerHTML += `
        <a href="${d[s]}" target="_blank">
          <i class="fa-brands fa-${s}"></i>
        </a>
      `;
    }
  });
})
.catch(err => {
  console.error("ERROR:", err);
});
