const firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const user = new URLSearchParams(location.search).get("user");

db.collection("users").doc(user).get().then(doc=>{
  if(!doc.exists) return;

  const d = doc.data();

  document.getElementById("name").innerText = d.name || "";
  document.getElementById("job").innerText = d.job || "";
  document.getElementById("company").innerText = d.company || "";

  document.getElementById("avatar").src =
    d.avatar || "assets/images/avatar.jpg";

  document.getElementById("cover").style.backgroundImage =
    `url(${d.cover || "assets/images/cover.jpg"})`;

  document.getElementById("phone").href = `tel:${d.phone}`;
  document.getElementById("email").href = `mailto:${d.email}`;

  const socials = document.getElementById("socials");
  socials.innerHTML = "";

  const icons = {
    whatsapp:"fa-whatsapp",
    facebook:"fa-facebook-f",
    instagram:"fa-instagram",
    tiktok:"fa-tiktok",
    snapchat:"fa-snapchat"
  };

  for(let k in icons){
    if(!d[k]) continue;

    const a = document.createElement("a");
    a.href = d[k];
    a.target="_blank";
    a.innerHTML = `<i class="fa-brands ${icons[k]}"></i>`;

    if(k==="tiktok") a.classList.add("center");

    socials.appendChild(a);
  }
});
