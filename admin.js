import { saveUser, uploadImage } from "./firebase.js";

document.getElementById("adminForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  if (!username) {
    alert("اكتب اسم اليوزر");
    return;
  }

  const data = {
    name: document.getElementById("name").value,
    job: document.getElementById("job").value,
    company: document.getElementById("company").value,
    phone: document.getElementById("phone").value,
    email: document.getElementById("email").value,
    socials: {
      instagram: document.getElementById("instagram").value,
      whatsapp: document.getElementById("whatsapp").value,
      snapchat: document.getElementById("snapchat").value,
      facebook: document.getElementById("facebook").value,
      tiktok: document.getElementById("tiktok").value,
      twitter: document.getElementById("twitter").value,
      linkedin: document.getElementById("linkedin").value,
      
    }
  };

  try {
    await saveUser(username, data);
    alert("✅ اتحفظ بنجاح");
  } catch (err) {
    console.error(err);
    alert("❌ حصل خطأ");
  }
});
