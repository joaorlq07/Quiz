const question = document.querySelector(".question");
const answers = document.querySelector(".answers");
const spnQtd = document.querySelector(".spnQtd");
const textFinish = document.querySelector(".finish span");
const content = document.querySelector(".content");
const contentFinish = document.querySelector(".finish");
const btnRestart = document.querySelector(".finish button");
const btnNext = document.querySelector(".next-button");

import questions from "../Iluminismo/questões.js";

let currentIndex = 0;
let questionsCorrect = 0;

btnRestart.onclick = () => {
  content.style.display = "flex";
  contentFinish.style.display = "none";

  currentIndex = 0;
  questionsCorrect = 0;
  loadQuestion();
};

btnNext.addEventListener("click", () => {
  if (currentIndex < questions.length - 1) {
    currentIndex++;
    loadQuestion();
  } else {
    finish();
  }
});

function nextQuestion(e) {
  const selectedButton = e.target;

  if (selectedButton.getAttribute("data-correct") === "true") {
    selectedButton.classList.add("correct-answer");
    questionsCorrect++;
  } else {
    selectedButton.classList.add("wrong-answer");
    const correctButton = answers.querySelector('[data-correct="true"]');
    correctButton.classList.add("correct-answer");
    
    const explanation = document.createElement("p");
    explanation.classList.add("explanation");

    if (currentIndex === 0) {
      explanation.textContent = "O filósofo iluminista conhecido por seu tratado 'O Contrato Social' é Jean-Jacques Rousseau (opção 'b'). As outras opções estão incorretas, pois não se aplicam a Rousseau, que abordou questões políticas e sociais em sua obra.      ";
    } else {
      explanation.textContent = "O 'pai da filosofia iluminista' é considerado John Locke (opção 'd'), devido às suas influentes ideias sobre contrato social, direitos naturais e governo limitado. As outras opções estão incorretas, já que Galileu Galilei era um cientista, Immanuel Kant era um filósofo importante, mas não é chamado de 'pai' do iluminismo, e Montesquieu contribuiu para o iluminismo, mas não é o fundador do movimento.";
    }

    answers.appendChild(explanation);
  }

  document.querySelectorAll(".answer").forEach((item) => {
    item.removeEventListener("click", nextQuestion);
  });
}

function finish() {
  textFinish.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}`;
  content.style.display = "none";
  contentFinish.style.display = "flex";
}



function loadQuestion() {
  spnQtd.innerHTML = `${currentIndex + 1}/${questions.length}`;
  const item = questions[currentIndex];
  answers.innerHTML = "";
  question.innerHTML = item.question;

  item.answers.forEach((answer) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
    `;

    answers.appendChild(div);
  });

  // Resetar o texto do botão para "Próxima Pergunta" a menos que seja a última pergunta
  if (currentIndex !== questions.length - 1) {
    btnNext.textContent = "Próxima Pergunta";
  }

  document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
  });
}

loadQuestion();
