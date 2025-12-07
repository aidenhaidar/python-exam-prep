
let settings = JSON.parse(localStorage.getItem("settings")) || {
 theme:'base',sound:true,profiles:[]
};

window.onload=()=>{
 document.getElementById("themeSelect").value=settings.theme;
 document.getElementById("soundToggle").checked=settings.sound;
 renderProfiles();applyTheme(settings.theme);
};

function saveTheme(){
 settings.theme=document.getElementById("themeSelect").value;
 applyTheme(settings.theme);save();
}

function applyTheme(t){
 document.querySelector("link[href*='styles']")
 .setAttribute("href","/static/styles/"+t+".css");
}

function saveSound(){settings.sound=document.getElementById("soundToggle").checked;save();}

function saveProfile(){
 let p=document.getElementById("profileInput").value.trim();if(!p)return;
 if(!settings.profiles.includes(p))settings.profiles.push(p);
 save();renderProfiles();
}

function renderProfiles(){
 let b=document.getElementById("profileList");b.innerHTML="";
 settings.profiles.forEach(p=>{
  let tag=document.createElement("div");
  tag.className="profileTag";tag.innerText=p;b.appendChild(tag);
 });
}

function save(){localStorage.setItem("settings",JSON.stringify(settings));}
