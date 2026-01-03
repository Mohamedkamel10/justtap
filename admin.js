document.getElementById("saveBtn").onclick = function () {
  const username = document.getElementById("username").value.trim();
  const name = document.getElementById("name").value;
  const job = document.getElementById("job").value;

  const avatarInput = document.getElementById("avatar");
  const coverInput = document.getElementById("cover");

  if (!username) {
    alert("Username required");
    return;
  }

  const readerAvatar = new FileReader();
  const readerCover = new FileReader();

  readerAvatar.onload = function () {
    readerCover.onload = function () {
      const users = JSON.parse(localStorage.getItem("users") || "{}");

      users[username] = {
        name,
        job,
        avatar: readerAvatar.result,
        cover: readerCover.result
      };

      localStorage.setItem("users", JSON.stringify(users));
      alert("Saved successfully ✔");
    };
    if (coverInput.files[0]) {
      readerCover.readAsDataURL(coverInput.files[0]);
    } else {
      readerCover.onload();
    }
  };

  if (avatarInput.files[0]) {
    readerAvatar.readAsDataURL(avatarInput.files[0]);
  } else {
    readerAvatar.onload();
  }
};
