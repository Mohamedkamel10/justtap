/* ===== FIREBASE CONFIG ===== */
const firebaseConfig = {
 apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ===== GET USER FROM URL ===== */
const params = new URLSearchParams(window.location.search);
const userId = params.get("user");

/* ===== ICONS MAP ===== */
const icons = {
  whatsapp:"fa-whatsapp",
  facebook:"fa-facebook-f",
  instagram:"fa-instagram",
  tiktok:"fa-tiktok",
  snapchat:"fa-snapchat"
};

/* ===== LOAD DATA ===== */
db.collection("users").doc(userId).get().then(doc=>{
  if(!doc.exists) return;

  const d = doc.data();

  document.getElementById("cover").style.backgroundImage =
    `url(${d.cover})`;

  document.getElementById("avatar").src = d.avatar;
  document.getElementById("name").innerText = d.name;
  document.getElementById("job").innerText = d.job;
  document.getElementById("company").innerText = d.company;

  document.getElementById("call").href = `tel:${d.phone}`;
  document.getElementById("mail").href = `mailto:${d.email}`;

  const socials = document.getElementById("socials");
  socials.innerHTML = "";

  Object.keys(icons).forEach(key=>{
    if(!d[key]) return;

    const div = document.createElement("div");
    div.className = "social-item";

    if(key === "tiktok") div.classList.add("center");

    div.innerHTML = `
      <a href="${d[key]}" target="_blank"
         style="text-decoration:none;color:inherit">
        <i class="fa-brands ${icons[key]}"></i>
        <p>${key}</p>
      </a>
    `;
    socials.appendChild(div);
  });
});
