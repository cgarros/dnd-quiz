function generateQuestion (title, answers) {
  let innerHtml = `
    <h2>${title}</h2>
    ${
      ''.join(answers.map((a, i) => `<div style="display: inline-flex; width: 100vw;"> <input type="radio" name="gender" value="${i}"> <p> ${a.display} </p> </div>`))
    }
  `;
  document.getElementById("box").innerHTML = innerHtml;
}

function setQuestion(question) {
  window.current = question;
  generateQuestion(question.title, question.answers);
}

// TODO: make this list
let skills = [
  "Athletics, Acrobatics, Sleight of Hand, Stealth, Arcana, History, Investigation, Nature, Religion, Animal Handling, Insight, Medicine, Perception, Survival, Deception, Intimidation, Performance, Persuation"
];
function start_quiz() {

}
