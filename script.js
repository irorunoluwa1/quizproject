const form=document.getElementById("quizForm");
const button=document.getElementById("submitBtn");
const result=document.getElementById("result");
const error= document.getElementById("error");
const resetBtn=document.getElementById("resetBtn");
const correctAnswers ={
q1: "c",
q2: "b",
q3: "b",
q4: "d",
q5: "d"
};

let userAnswers={}
function saveAnswer(question,value){
  userAnswers[question]=value;
  console.log(userAnswers);
}
//listen to the formand whenever sometghing changes run tthis code
form.addEventListener("change",function(e){
  const name= e.target.name;
  const value=e.target.value;
  saveAnswer(name,value);
})
function allAnswered(){
  return Object.keys(correctAnswers).every(function(question){
    return userAnswers[question]!==undefined;
  });
}
form.addEventListener("change",function(e){
  const name =e.target.name;
  const value=e.target.value;
  saveAnswer(name,value);

  if (allAnswered()){
    submitBtn.style.display="block";
  }
});
function saveAnswer(question,value){
  userAnswers[question]=value;


  localStorage.setItem("quizAnswers", JSON.stringify(userAnswers));
  console.log("Current Answers:",userAnswers)
}
window.addEventListener("load",function(){
  const savedAnswers=localStorage.getItem("quizAnswers");
 if(savedAnswers){
  userAnswers = JSON.parse(savedAnswers);
 }
  
});


window.addEventListener("load", function(){
  const saved =localStorage.getItem("quizAnswers");

  if(saved){
    userAnswers=JSON.parse(saved);

    Object.keys(userAnswers).forEach(function(question){
      const value=userAnswers[question];


      const input = document.querySelector(`input[name="${question}"][value="${value}"]`
    );
      if(input){
        input.checked=true;
      }
    });
  }
  if(allAnswered()){
    submitBtn.style.display="block";
  }else{
    submitBtn.style.display="none";
  }
});

function calculateScore(){
  let score=0;
  Object.keys(correctAnswers).forEach(function(q){
    const selected= document.querySelector(`input[name="${q}"]:checked`

    );
    const feedback = document.getElementById(`err-${q}`);

    if(userAnswers[q]===correctAnswers[q]){
      score++;

      selected.parentElement.classList.add("correct");

      feedbackinnerText="Correct!";
      feedback.style.color="green";
    }else{
      selected.parentElement.classList.add("wrong");
    feedback.innerText=`Wrong correct answer is ${correctAnswers[q]}`;
    feedback.style.color="red";
    }
  });
  showScore(score);
}
function showScore(score){
  const total=Object.keys(correctAnswers).length;
  result.innerText=`Your Score: ${score}/${total}`;
  
}
form.addEventListener("submit",function(e){
  e.preventDefault();
  calculateScore();
});

resetBtn.addEventListener("click",function(){
  localStorage.clear();
  location.reload();
});

