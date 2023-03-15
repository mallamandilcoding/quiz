// alert("mandil");
// const quiz = document.querySelector('.answer-list');
const quizContainer = document.querySelector('.quiz-container');
let datas = [];
let counter = 0;
let score = 0;


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const loadquiz = (data) => {
  quizContainer.innerHTML = "";
  let ans = [];
  // let next = 0;
  const currentQuiz =data;
  const question = currentQuiz.question;
  const incorrectAns = currentQuiz.incorrectAnswers;
  incorrectAns.forEach((a) => {
    ans.push(a);
  });
  const correctAns = currentQuiz.correctAnswer;
  ans.push(correctAns);
  // console.log(ans);
  ans = shuffle(ans);
  // console.log(ans);

  // quiz.style.display = "block";
  quizContainer.insertAdjacentHTML("afterbegin",
    `
     <h3>${question}</h3>
    `);
  ans.forEach((a) => {
    quizContainer.insertAdjacentHTML("beforeend",
    `
    <div class="ans-li">
      <input type="radio" id='${a}' name="quizanswer" value='${a}'>
      <label for='${a}'>${a}</label>
    </div>
    `);
  });
  quizContainer.insertAdjacentHTML("beforeend",
    `
    <button class="btn" id="next">SELECT</button>
    `);
  // counter++;

}



const getQuiz = (quizs) => {
  // console.log(quizs);
  const quiz = quizs.join();
  // console.log(quiz);
  fetch(`https://the-trivia-api.com/api/questions?categories=${quiz}&limit=10&difficulty=easy`)
  .then(response => response.json())
  .then((data) => {
    datas = data;
    // console.log(datas)
    loadquiz(datas[counter]);
  })
}

const getCategories = ()=> {
  fetch('https://the-trivia-api.com/api/categories')
  .then(response => response.json())
  .then((data) => {
    // console.log(data);
    const keys = Object.keys(data);
    // console.log(keys);
    quizContainer.innerHTML = "";
    quizContainer.insertAdjacentHTML("afterbegin",
     `

     <h3>SELECT THE QUIZ CATEGORY YOU ARE INTERESTED ON?? </h3>

     `);

    keys.forEach((key) => {
      quizContainer.insertAdjacentHTML("beforeend",
      `
      <div class = "checkbox">
        <input type="checkbox" id="${key}" name="${key}" value="${key}">
        <label for="${key}"> ${key}</label>
      </div>
      `);
    });
    quizContainer.insertAdjacentHTML("beforeend",
    `

    <button class="btn" id="select">SELECT</button>
    `);

   })
}

// getQuiz();
getCategories();



//submit click after choosing category
quizContainer.addEventListener("click", (e) => {
  if (e.target.id === 'select'){
    // console.log("select")
    let checkboxes= document.querySelectorAll('input[type="checkbox"]:checked');

    if (checkboxes.length !=0 ) {
      // console.log(checkboxes.length);
      let output= [];
      checkboxes.forEach((checkbox) => {
        output.push(checkbox.value);
      });
      getQuiz(output);
    } else {
      alert("PLEASE SELECT AT LEAST 1 CATEGORY");
    }
  }
});


// answering the quiz and displaying next quiz
quizContainer.addEventListener("click",(e) => {
  // console.log(e.target.value)

  // console.log(datas)
  if(e.target.id === 'next'){
    if(counter < datas.length-1)
    {
       // console.log(datas[counter].correctAnswer);
      const  radioAns = document.querySelector('input[name="quizanswer"]:checked');
      if(radioAns == null){
        alert("Please Select At least 1 answer to proceed ahead")
      }
      else{
        const choosenValue = radioAns.value;
        // console.log(choosenValue)
        if (datas[counter].correctAnswer === choosenValue) {
          score++;
          // console.log(score)
        }
          counter++;
          loadquiz(datas[counter]);
      }

    }
    else {
      quizContainer.innerHTML = "";
      // console.log(score)
      quizContainer.insertAdjacentHTML("afterbegin",
        `
        <h3> SCORE : ${score} / 10 </h3>
        <button class="btn" id="play">PLAY AGAIN</button>
        `);
        }
  }

});


quizContainer.addEventListener("click",(e)=>{
  if (e.target.id === 'play'){
    getCategories();
  }
})
