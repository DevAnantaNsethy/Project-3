function startQuiz() {
  window.location.href = "quiz.html";
  // In next steps we'll route this to the actual quiz section
}

// Theme toggle logic
const themeBtn = document.getElementById("theme-toggle");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
document.addEventListener("DOMContentLoaded", () => {
  const factElement = document.getElementById("fun-fact");

  async function fetchFunFact() {
    try {
      const response = await fetch(
        "https://uselessfacts.jsph.pl/api/v2/facts/random?language=en"
      );
      const data = await response.json();
      factElement.textContent = `"${data.text}"`;
    } catch (error) {
      factElement.textContent =
        "Couldn't load a fun fact. The internet probably took a nap.";
      console.error("Fun Fact API error:", error);
    }
  }

  fetchFunFact(); // Load one fact on page load
});
const enterBtn = document.getElementById("enterBtn");
const playerInput = document.getElementById("playerName");
const quizSection = document.getElementById("quiz");
const introSection = document.getElementById("intro");
const playerNameDisplay = document.getElementById("player");
const beginBtn = document.getElementById("beginQuizBtn");
const questionBox = document.getElementById("questionBox");
const timerEl = document.getElementById("timer");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("options");

const sound = document.getElementById("kbc-sound");

let questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Who wrote 'Hamlet'?",
    options: ["Tolstoy", "Shakespeare", "Homer", "Dante"],
    answer: "Shakespeare",
  },
];

let currentQ = 0;
let score = 0;
let timer = 1200;
let interval;

enterBtn.addEventListener("click", () => {
  const name = playerInput.value.trim();
  if (name) {
    playerNameDisplay.textContent = name;
    introSection.classList.add("hidden");
    quizSection.classList.remove("hidden");
    quizSection.scrollIntoView({ behavior: "smooth" });
  }
});

beginBtn.addEventListener("click", () => {
  sound.play();
  beginBtn.classList.add("hidden");
  questionBox.classList.remove("hidden");
  loadQuestion();
  startTimer();
});

function loadQuestion() {
  const q = questions[currentQ];
  questionText.textContent = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(opt);
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selected) {
  if (selected === questions[currentQ].answer) {
    score += 4;
  } else {
    score -= 1;
  }
  document.getElementById("nextBtn").click(); // auto-move to next
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (currentQ < questions.length - 1) {
    currentQ++;
    loadQuestion();
  }
});

document.getElementById("prevBtn").addEventListener("click", () => {
  if (currentQ > 0) {
    currentQ--;
    loadQuestion();
  }
});

document.getElementById("submitBtn").addEventListener("click", () => {
  clearInterval(interval);
  confetti();
  alert(`🎉 Quiz Complete!\nScore: ${score}`);
});

function startTimer() {
  interval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(interval);
      alert("⏰ Time's up!");
      document.getElementById("submitBtn").click();
    } else {
      timer--;
      let minutes = Math.floor(timer / 60);
      let seconds = timer % 60;
      timerEl.textContent = `⏳ ${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds}`;
    }
  }, 1000);
}
