const params = new URLSearchParams(window.location.search);
const username = params.get("user");

const users = JSON.parse(localStorage.getItem("users") || "{}");
const user = users[username];

if (!user) {
  document.body.innerHTML = "<h2>User not found</h2>";
  throw "";
}

document.getElementById("name").textContent = user.name;
document.getElementById("job").textContent = user.job;
document.getElementById("avatar").style.backgroundImage = `url(${user.avatar})`;
document.getElementById("cover").style.backgroundImage = `url(${user.cover})`;

const box = document.getElementById("socialLinks");

function add(icon, link){
  if(!link) return;
  const a = document.createElement("a");
  a.href = link;
  a.target="_blank";
  a.innerHTML = `<i class="fab fa-${icon}"></i>`;
  box.appendChild(a);
}

add("facebook", user.socials.facebook);
add("instagram", user.socials.instagram);
add("tiktok", user.socials.tiktok);
add("snapchat", user.socials.snapchat);

if(user.socials.whatsapp){
  add("whatsapp", "https://wa.me/" + user.socials.whatsapp);
}
