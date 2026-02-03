import { uploadImage, saveUser } from "./firebase-config.js";

const ADMIN_PASSWORD = "123456"; // غيرها براحتك

window.save = async function () {
  const pass = document.getElementById("adminPass").value;
  if (pass !== ADMIN_PASSWORD) {
    alert("Wrong password");
    return;
  }

  const username = document.getElementById("username").value.trim();
  if (!username) return alert("Username required");


  const avatarFile = document.getElementById("avatar").files[0];

  let avatarUrl = "";
  if (avatarFile) {
    avatarUrl = await uploadImage(avatarFile, `avatars/${username}.jpg`);
  }
  
const coverInput = document.getElementById("coverInput");
let coverURL = "";

if (coverInput.files.length > 0) {
  coverURL = await uploadImage(
    coverInput.files[0],
    `covers/${username}.jpg`
  );
}
  const data = {
    name: document.getElementById("name").value,
    job: document.getElementById("job").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    avatar: avatarUrl,
    cover: coverUrl,
    socials: {
      facebook: facebook.value,
      instagram: instagram.value,
      snapchat: snapchat.value,
      twitter: twitter.value,
      linkedin: linkedin.value,
      whatsapp: whatsapp.value,
      tiktok: tiktok.value
    }
  };

  await saveUser(username, data);
  document.getElementById("status").innerText = "✅ User Saved Successfully";
};
