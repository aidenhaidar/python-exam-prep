
// Quiz_System_V3 — FULL ENGINE BUILD
// -----------------------------------------------
// MODES: Practice • Timed Exam • Mistake Review
// Tracks accuracy, saves stats permanently

let score=0,total=0,wrong=[],mode="practice",timer=null,timeLeft=300,limit=50;

// Load saved stats
let stats = JSON.parse(localStorage.getItem("quizStats")) || {
    sessions: [], totalAnswered:0,totalCorrect:0,bestScore:0
};

async function getQ(){ return await (await fetch("/question")).json(); }

async function startQuiz(){ mode="practice";reset();showBox();next(); }
async function startExam(){ mode="exam";reset();timeLeft=300;showBox();startTimer();next(); }
async function reviewWrong(){
    if(!wrong.length) return alert("No mistakes to review yet");
    mode="review";showBox();loadManual(wrong.pop());
}

function reset(){ score=0;total=0;}
function showBox(){ document.getElementById("quizBox").classList.remove("hidden");}
async function next(){
    if(mode==="exam" && total>=limit) return finish();
    render(await getQ());
}
function render(q){
    document.getElementById("question").innerText=q.question;
    document.getElementById("options").innerHTML="";
    q.choices.forEach(c=>{
        let b=document.createElement("button");
        b.className="choice";b.innerText=c;
        b.onclick=()=>check(q,c[0],b);
        document.getElementById("options").appendChild(b);
    });
}
function loadManual(q){
    document.getElementById("question").innerText=q.question;
    document.getElementById("options").innerHTML="";
    q.choices.forEach(c=>{
        let b=document.createElement("button");
        b.className="choice";b.innerText=c;
        b.onclick=()=>alert("Correct: "+q.answer);
        document.getElementById("options").appendChild(b);
    });
}
async function check(q,a,btn){
    let r= await(await fetch("/check",{method:"POST",headers:{'Content-Type':'application/json'},
    body:JSON.stringify({question:q.question,answer:a})})).json();
    document.querySelectorAll(".choice").forEach(b=>b.disabled=true);

    if(r.correct){score++;btn.classList.add("correct");}
    else{wrong.push(q);btn.classList.add("wrong");}

    total++;update();save();
    setTimeout(next,650);
}
function update(){
    document.getElementById("stats").innerText=
    `Score: ${score}/${total} • Accuracy: ${Math.round(score/Math.max(total,1)*100)}%`;
}
function startTimer(){
    timer=setInterval(()=>{
        timeLeft--;
        document.getElementById("stats").innerText+=` ⏳${timeLeft}s`;
        if(timeLeft<=0) finish();
    },1000);
}
function finish(){
    clearInterval(timer);
    let accuracy=Math.round(score/limit*100);
    stats.totalAnswered+=limit;stats.totalCorrect+=score;
    stats.bestScore=Math.max(stats.bestScore,score);
    stats.sessions.push({score,accuracy,date:new Date().toLocaleString()});
    save();alert(`Exam Complete!\nScore ${score}/${limit}\nAccuracy ${accuracy}%`);
}
function save(){ localStorage.setItem("quizStats",JSON.stringify(stats)); }
