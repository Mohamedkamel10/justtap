function toBase64(file,cb){
 const r=new FileReader();
 r.onload=()=>cb(r.result);
 r.readAsDataURL(file);
}

function saveUser(){
 const users=JSON.parse(localStorage.getItem("users")||"{}");

 toBase64(avatar.files[0],av=>{
  toBase64(cover.files[0],cv=>{
   users[username.value]={
    name:name.value,
    job:job.value,
    avatar:av,
    cover:cv,
    instagram:instagram.value,
    facebook:facebook.value,
    whatsapp:whatsapp.value
   };
   localStorage.setItem("users",JSON.stringify(users));
   alert("تم الحفظ بنجاح");
  });
 });
}
