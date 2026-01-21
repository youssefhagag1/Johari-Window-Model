const answers = {};
let current_question = 0;

const q_counter = document.querySelector(".info span");
const question = document.querySelector(".question");
const answer_1 = document.querySelector(".ans1 p");
const answer_2 = document.querySelector(".ans2 p");
const selection_1 = document.getElementById("selection1");
const selection_2 = document.getElementById("selection2");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const finsh = document.getElementById("finsh");
const timer = document.getElementById("timer");

const instructions = document.getElementById("instructions");
const quiz = document.getElementById("quiz");
const startBtn = document.getElementById("start");

/* ================= TIMER ================= */
const endTime = Date.now() + 1000 * 60 * 60;

const interval = setInterval(() => {
    if (Date.now() >= endTime) {
        clearInterval(interval);
        localStorage.setItem("answers", JSON.stringify(answers));
        location = "./result.html";
    }
    const diff = new Date(endTime - Date.now());
    timer.textContent =
        `${diff.getMinutes().toString().padStart(2, "0")}:${diff.getSeconds().toString().padStart(2, "0")}`;
}, 1000);

/* ================= DATA ================= */
const getQuestions = async () => {
    const res = await fetch("./questions.json");
    return await res.json();
};

/* ================= UI ================= */
const muteNext = () => {
    next.style.pointerEvents = "none";
    next.style.opacity = "0.5";
};

const enableNext = () => {
    next.style.pointerEvents = "auto";
    next.style.opacity = "1";
};

const checkButtons = () => {
    const a = answers[current_question]?.A ?? null;
    const b = answers[current_question]?.B ?? null;

    if (a !== null && b !== null && a + b === 5) {
        enableNext();

        if (current_question === 19) {
            finsh.disabled = false;
        }
    } else {
        muteNext();
        finsh.disabled = true;
    }
};

/* ================= QUESTIONS ================= */
const showQuestion = async (index) => {
    const questions = await getQuestions();
    const q = questions[index];

    prev.style.display = index === 0 ? "none" : "block";
    next.style.display = index === 19 ? "none" : "block";
    finsh.style.display = index === 19 ? "block" : "none";

    q_counter.textContent = `Q${index + 1}`;
    question.textContent = q.question;
    answer_1.textContent = q.A;
    answer_2.textContent = q.B;

    selection_1.innerHTML = "";
    selection_2.innerHTML = "";

    for (let i = 0; i <= 5; i++) {
        selection_1.innerHTML += `
            <label>
                <input type="radio" name="ans1" value="${i}"
                ${answers[index]?.A === i ? "checked" : ""}>
                ${i}
            </label>
        `;

        selection_2.innerHTML += `
            <label>
                <input type="radio" name="ans2" value="${i}"
                ${answers[index]?.B === i ? "checked" : ""}>
                ${i}
            </label>
        `;
    }

    document.querySelectorAll('input[name="ans1"]').forEach(el => {
        el.onchange = () => addAnswer("A", +el.value);
    });

    document.querySelectorAll('input[name="ans2"]').forEach(el => {
        el.onchange = () => addAnswer("B", +el.value);
    });

    checkButtons();
};

/* ================= LOGIC ================= */
const addAnswer = (type, value) => {
    if (!answers[current_question]) answers[current_question] = {};

    answers[current_question][type] = value;

    // auto balance
    if (value === 5) {
        answers[current_question][type === "A" ? "B" : "A"] = 0;
    }

    showQuestion(current_question);
};

/* ================= EVENTS ================= */
startBtn.onclick = () => {
    instructions.style.display = "none";
    quiz.style.display = "block";
    showQuestion(0);
};

next.onclick = () => {
    current_question++;
    showQuestion(current_question);
};

prev.onclick = () => {
    current_question--;
    showQuestion(current_question);
};

finsh.onclick = () => {
    localStorage.setItem("answers", JSON.stringify(answers));
    location = "./result.html";
};
