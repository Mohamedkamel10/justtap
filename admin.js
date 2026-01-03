document.getElementById("saveBtn").onclick = function () {

  const v = id => document.getElementById(id).value.trim();
  const f = id => document.getElementById(id).files[0];

  const username = v("username");
  if (!username) return alert("Username required");

  const readerAvatar = new FileReader();
  const readerCover = new FileReader();

  readerAvatar.onload = () => {
    readerCover.onload = () => {

      const users = JSON.parse(localStorage.getItem("users") || "{}");

      users[username] = {
        name: v("name"),
        job: v("job"),
        phone: v("phone"),
        email: v("email"),
        socials: {
          facebook: v("facebook"),
          instagram: v("instagram"),
          whatsapp: v("whatsapp"),
          tiktok: v("tiktok"),
          snapchat: v("snapchat")
        },
        avatar: readerAvatar.result,
        cover: readerCover.result
      };

      localStorage.setItem("users", JSON.stringify(users));
      alert("Saved successfully ✔");
    };

    f("cover") ? readerCover.readAsDataURL(f("cover")) : readerCover.onload();
  };

  f("avatar") ? readerAvatar.readAsDataURL(f("avatar")) : readerAvatar.onload();
};
