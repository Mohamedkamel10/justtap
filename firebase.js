// FIREBASE CONFIG
var firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
};

// يمنع duplicate-app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();


// USERNAME
const params = new URLSearchParams(window.location.search);
const username = params.get("user");


// LOAD DATA
window.addEventListener("DOMContentLoaded", async () => {

  if (!username) return;

  try {

    const doc = await db.collection("users").doc(username).get();

    if (!doc.exists) {
      console.error("User not found");
      return;
    }

    const data = doc.data();

    // TEXT
    document.getElementById("name").textContent = data.name || "";
    document.getElementById("job").textContent = data.job || "";

    // IMAGES
    if (data.avatar) {
      document.getElementById("avatar").src = data.avatar;
    }

    if (data.cover) {
      document.getElementById("cover").style.backgroundImage =
        `url('${data.cover}')`;
    }

    // PHONE
    if (data.phone) {
      document.getElementById("phone").href = `tel:${data.phone}`;
    }

    // EMAIL
    if (data.email) {
      document.getElementById("email").href = `mailto:${data.email}`;
    }

    // SOCIALS
    const socialsDiv = document.getElementById("socials");
    socialsDiv.innerHTML = "";

    if (data.socials) {

      Object.entries(data.socials).forEach(([key, value]) => {

        if (!value) return;

        // يمنع فتح نفس الصفحة
        const link =
          value.startsWith("http") ? value : `https://${value}`;

        const a = document.createElement("a");
        a.href = link;
        a.target = "_blank";

        a.innerHTML = `<i class="fa-brands fa-${key}"></i>`;

        socialsDiv.appendChild(a);
      });
    }

  } catch (err) {
    console.error("Firestore Error:", err);
  }

});
