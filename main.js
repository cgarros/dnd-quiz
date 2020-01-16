// convinces functions for getting items from localstorage
function getQuestionIndex() {
  return JSON.parse(localStorage.getItem("question_index")) || 0
}
function setQuestionIndex(index) {
  localStorage.setItem("question_index", JSON.stringify(index))
}

function setResults(res) {
  localStorage.setItem("results", JSON.stringify(res))
}
function getResults() {
  return JSON.parse(localStorage.getItem("results")) || []
}



var selectionIndex = 0;
function generateQuestion (title, answers) {
  let innerHtml = `
    <h2>${title}</h2>
    ${
      answers.map((a, i) => `
      <div style="display: inline-flex; width: 100vw;" onclick="setSelectionIndex(${i})">
        <input style="width:100px" type="radio" name="gender" value="${i}">
        <p> ${a.display} </p>
      </div>`).join('')
    }
    <button onclick="finishQuestion()">Confirm</button>
  `;
  document.getElementById("box").innerHTML = innerHtml;
}

function setQuestion(question) {
  window.current = question;
  generateQuestion(question.title, question.answers);
}

function setSelectionIndex(i) {
  selectionIndex = i;
}
function getSelectionIndex() {
  // TODO: get rid of selectionIndex variable, and actually  check the value
  return selectionIndex;
}

function finishQuestion() {
  let index = getQuestionIndex();
  let data = {
    index,
    answer: getSelectionIndex()
  }

  let res = getResults();
  res[index] = data;
  setResults(res);

  nextQuestion();
}

// TODO: make this list
let skills = [
  "Athletics, Acrobatics, Sleight of Hand, Stealth, Arcana, History, Investigation, Nature, Religion, Animal Handling, Insight, Medicine, Perception, Survival, Deception, Intimidation, Performance, Persuation"
];

function getAScore(score) {
  return localStorage.quiz.scores[score] || 0;
}

function isPermissableQuestion(index) {
  // TODO: question dependecies should be dealt with here
  let val = window.questions.questions[index];
  return val && true;
}

function nextQuestion() {
  let qi = getQuestionIndex();
  do {
    qi++;
  } while(!isPermissableQuestion(qi));
  setQuestionIndex(qi);
  setQuestion(window.questions.questions[qi])
}

function start_quiz() {
  localStorage.question_index = -1;
  window.stores = {};
  nextQuestion();
}

window.onload = function () {
  fetch('questions.json')
    .then((response) => {
      return response.json();
    })
    .then((myJson) => {
      console.log(myJson);
      window.questions = myJson
    });
}
