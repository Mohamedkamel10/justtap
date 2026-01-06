const params = new URLSearchParams(window.location.search);
const username = params.get("user");

const users = JSON.parse(localStorage.getItem("users") || "{}");
const user = users[username];

if(!user){
 document.body.innerHTML="<h2 style='text-align:center'>User not found</h2>";
}else{
 document.getElementById("profile").innerHTML=`
 <div class="card">
  <div class="cover" style="background-image:url(${user.cover})"></div>
  <div class="avatar" style="background-image:url(${user.avatar})"></div>
  <div class="content">
   <h2>${user.name}</h2>
   <p>${user.job}</p>
   <div class="socials">
    ${user.instagram?`<a href="${user.instagram}"><i class="fab fa-instagram"></i></a>`:''}
    ${user.facebook?`<a href="${user.facebook}"><i class="fab fa-facebook"></i></a>`:''}
    ${user.whatsapp?`<a href="${user.whatsapp}"><i class="fab fa-whatsapp"></i></a>`:''}
   </div>
  </div>
 </div>`;
}
