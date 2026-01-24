/* ===============================
   Firebase Config
================================ */
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ===============================
   Get User ID From URL
   example: profile.html?user=abc123
================================ */
const params = new URLSearchParams(window.location.search);
const userId = params.get("user");

if (!userId) {
  console.error("User ID not found in URL");
}

/* ===============================
   DOM Elements
================================ */
const nameEl = document.getElementById("name");
const jobEl = document.getElementById("job");
const phoneEl = document.getElementById("phone");
const emailEl = document.getElementById("email");
const avatarEl = document.getElementById("avatar");
const coverEl = document.getElementById("cover");
const socialsEl = document.getElementById("socials");

/* ===============================
   Load User Data
================================ */
db.collection("users")
  .doc(userId)
  .get()
  .then((doc) => {
    if (!doc.exists) {
      console.error("User not found");
      return;
    }

    const data = doc.data();

    /* Basic Info */
    nameEl.textContent = data.name || "";
    jobEl.textContent = data.job || "";

    /* Contact */
    if (data.phone) phoneEl.href = `tel:${data.phone}`;
    if (data.email) emailEl.href = `mailto:${data.email}`;

    /* Images */
    if (data.avatar) avatarEl.src = data.avatar;
    if (data.cover) coverEl.style.backgroundImage = `url(${data.cover})`;

    /* Social Media */
    socialsEl.innerHTML = "";

    const socials = [
      { icon: "fa-whatsapp", url: data.whatsapp },
      { icon: "fa-facebook-f", url: data.facebook },
      { icon: "fa-instagram", url: data.instagram },
      { icon: "fa-x-twitter", url: data.twitter },
      { icon: "fa-snapchat", url: data.snapchat },
      { icon: "fa-tiktok", url: data.tiktok }
    ].filter(item => item.url && item.url.trim() !== "");

    socials.forEach((item, index) => {
      const a = document.createElement("a");
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.innerHTML = `<i class="fa-brands ${item.icon}"></i>`;

      /* لو عدد فردي → آخر عنصر في النص */
      if (socials.length % 2 !== 0 && index === socials.length - 1) {
        a.classList.add("single");
      }

      socialsEl.appendChild(a);
    });
  })
  .catch((error) => {
    console.error("Firebase Error:", error);
  });
