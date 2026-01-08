<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

<script>
console.log("JS WORKING");

const firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const params = new URLSearchParams(window.location.search);
const user = params.get("user");

console.log("USER:", user);

if (!user) {
  alert("No user param");
  throw "";
}

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

  if (d.avatar) document.getElementById("avatar").src = d.avatar;
  if (d.cover) document.getElementById("cover").style.backgroundImage = `url('${d.cover}')`;

  if (d.email) document.getElementById("emailBtn").href = `mailto:${d.email}`;
  if (d.phone) document.getElementById("phoneBtn").href = `tel:${d.phone}`;

  const socials = ["facebook","instagram","snapchat","tiktok","whatsapp"];
  const box = document.getElementById("socials");
  box.innerHTML = "";

  socials.forEach(s => {
    if (d[s]) {
      box.innerHTML += `<a href="${d[s]}" target="_blank">${s}</a>`;
    }
  });
})
.catch(err => {
  console.error("FIRESTORE ERROR:", err);
});
</script>
