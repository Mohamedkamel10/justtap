// ✅ Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
};

// 🔥 يمنع خطأ duplicate-app
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

var db = firebase.firestore();


// ✅ icon mapping (المهم جدا)
const iconMap = {
  facebook: "facebook-f",
  instagram: "instagram",
  snapchat: "snapchat",
  tiktok: "tiktok",
  whatsapp: "whatsapp",
  twitter: "x-twitter",
  linkedin: "linkedin-in"
};


// get username
const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (!username) {
  console.error("No user found in URL");
}


window.onload = function () {

  db.collection("users").doc(username).get()
  .then((doc) => {

    if (!doc.exists) {
      console.error("User not found");
      return;
    }

    const data = doc.data();

    // ✅ basic info
    document.getElementById("name").innerText = data.name || "";
    document.getElementById("job").innerText =
      `${data.job || ""} ${data.company ? "- " + data.company : ""}`;


    // ✅ phone
    if (data.phone) {
      document.getElementById("phone").href = `tel:${data.phone}`;
    }

    // ✅ email
    if (data.email) {
      document.getElementById("email").href = `mailto:${data.email}`;
    }


    // ✅ socials
    const socialsDiv = document.getElementById("socials");
    socialsDiv.innerHTML = "";

    if (data.socials) {

      Object.keys(data.socials).forEach((key) => {

        const url = data.socials[key];
        if (!url) return;

        const icon = iconMap[key] || key;

        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";

        // 🔥 يمنع ان الصفحة تفتح جوه موقعك
        a.rel = "noopener noreferrer";

        a.innerHTML = `<i class="fa-brands fa-${icon}"></i>`;

        socialsDiv.appendChild(a);
      });

    }

  })
  .catch(err => {
    console.error("Firestore error:", err);
  });

};
