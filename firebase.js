// Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyBgIH7EBZy-FFipEtBf0u1Db5uH6tVGKW8",
  authDomain: "just-tap-4e85e.firebaseapp.com",
  projectId: "just-tap-4e85e"
};

firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

// get username from url
const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (!username) {
  console.error("No user found in URL");
}

window.onload = function () {
  db.collection("users").doc(username).get().then((doc) => {
    if (!doc.exists) {
      console.error("User not found");
      return;
    }

    const data = doc.data();

    document.getElementById("name").innerText = data.name || "";
    document.getElementById("job").innerText = data.job || "";

    if (data.phone) {
      document.getElementById("phone").href = `tel:${data.phone}`;
    }

    if (data.email) {
      document.getElementById("email").href = `mailto:${data.email}`;
    }

    // socials
    const socialsDiv = document.getElementById("socials");
socialsDiv.innerHTML = "";

if (data.socials) {
  Object.keys(data.socials).forEach((key) => {
    const link = document.createElement("a");
    link.className = "social-box";
    link.href = data.socials[key];
    link.target = "_blank";

    link.innerHTML = `
      <i class="fa-brands fa-${key}"></i>
      <span>${key}</span>
    `;

    socialsDiv.appendChild(link);
  });
}

  });
};
