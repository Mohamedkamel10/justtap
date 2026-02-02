import { getUser } from "./firebase-config.js";

const params = new URLSearchParams(window.location.search);
const username = params.get("user");

if (!username) {
  alert("No user in URL");
}

const iconMap = {
  facebook: "facebook-f",
  instagram: "instagram",
  snapchat: "snapchat",
  twitter: "x-twitter",
  linkedin: "linkedin-in",
  whatsapp: "whatsapp"
};

async function loadUser() {
  const data = await getUser(username);

  if (!data) {
    alert("User not found");
    return;
  }

  // basic info
  document.getElementById("name").innerText = data.name || "";
  document.getElementById("job").innerText = data.job || "";

  // avatar
  document.getElementById("avatar").src =
    data.avatar || "./assets/images/avatar.jpg";

  // phone
  const phoneEl = document.getElementById("phone");
  if (data.phone) {
    phoneEl.href = `tel:${data.phone}`;
  } else {
    phoneEl.style.display = "none";
  }

  // email
  const emailEl = document.getElementById("email");
  if (data.email) {
    emailEl.href = `mailto:${data.email}`;
  } else {
    emailEl.style.display = "none";
  }

  // socials
  const socialsDiv = document.getElementById("socials");
  socialsDiv.innerHTML = "";

  if (data.socials) {
    Object.keys(data.socials).forEach(key => {
      const url = data.socials[key];
      if (!url) return;

      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";

      const icon = iconMap[key] || key;
      a.innerHTML = `<i class="fa-brands fa-${icon}"></i>`;

      socialsDiv.appendChild(a);
    });
  }
}

loadUser();
