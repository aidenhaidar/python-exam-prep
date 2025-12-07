
// Dashboard Analytics — Accuracy Graph

let stats=JSON.parse(localStorage.getItem("quizStats"))||{sessions:[]};

let labels = stats.sessions.map(x=>x.date);
let data = stats.sessions.map(x=>x.accuracy);

if(data.length===0){ labels=["None"]; data=[0]; }

new Chart(document.getElementById('chart'),{
 type:'line',
 data:{
  labels:labels,
  datasets:[{label:"Accuracy %",data:data,
  borderColor:"#000",backgroundColor:"rgba(0,0,0,.08)",borderWidth:3,tension:0.35}]
 }
});

function clearStats(){
 if(!confirm("Reset ALL stats?")) return;
 localStorage.removeItem("quizStats");location.reload();
}
