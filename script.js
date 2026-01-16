const answers = {};
const q_counter = document.querySelector(".info span");
const question = document.getElementsByClassName("question")[0];
const answer_1 = document.querySelector(".ans1 p");
const answer_2 = document.querySelector(".ans2 p");
const selection_1 = document.getElementById("selection1");
const selection_2 = document.getElementById("selection2");
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const finsh = document.getElementById("finsh");
const timer = document.getElementById("timer");
let current_question = 0;

const data_after_hour = Date.now() + 1000 * 60 *60;
const interval = setInterval(() => {
    if(data_after_hour <= Date.now()) {
        clearInterval(interval);
        localStorage.setItem("answers" , JSON.stringify(answers));
        location = "./result.html";
    }
    const current_date = Date.now();
    const now = new Date(data_after_hour - current_date);
    timer.textContent = `${now.getMinutes().toString().padStart(2 , "0")}:${now.getSeconds().toString().padStart(2 , "0")}`
} , 1000)


const getQuestions = async _ => {
    const response = await fetch("./questions.json");
    const questions = await response.json();
    return questions;
};

const showQuestion = questionNum => {
    if(current_question === 0){
        prev.style.display = "none";
    }else{
        prev.style.display = "block";
    }
    if(current_question === 20){
        next.style.display = "none";
        finsh.style.display = "block"
    }

    selection_1.innerHTML = "";
    selection_2.innerHTML = "";

    getQuestions()
        .then(questions => questions[questionNum])
        .then(q => {
            q_counter.textContent = `Q${current_question + 1}`;
            question.textContent = q.question;
            answer_1.textContent = q.A;
            answer_2.textContent = q.B;
            for(let i = 0 ; i<=5 ; i++){
                selection_1.innerHTML += `<div>
                                            <input type="radio" name="ans1" id="ans1-${i}" value="${i}" oninput="addAnswer('A', this.value)">
                                            <label for="ans1-${i}">${i}</label>
                                        </div>`;
                selection_2.innerHTML += `<div>
                                            <input type="radio" name="ans2" id="ans2-${i}" value="${i}" oninput="addAnswer('B', this.value)">
                                            <label for="ans2-${i}">${i}</label>
                                        </div>`;
            }
        })
}

window.addEventListener("load" , _ => {
    muteNext();
    showQuestion(current_question);
});

next.addEventListener("click" , _ => {
    muteNext();
    current_question++;
    showQuestion(current_question);
})
prev.addEventListener("click" , _ => {
    current_question--;
    showQuestion(current_question);
})

const addAnswer = (answer_option, value) => {
    if (!answers[current_question]) {
        answers[current_question] = {};
    }
    answers[current_question][answer_option] = Number(value);
    if(answers[current_question]["A"] + answers[current_question]["B"] == 5){
        next.style.pointerEvents = "auto";
        next.style.opacity = "1";

    }else{
        muteNext();
    }
};
const muteNext = _ => {
    next.style.pointerEvents = "none";
    next.style.opacity = "0.5";
}
finsh.addEventListener("click" , _ => {
    localStorage.setItem("answers" , JSON.stringify(answers));
    location = "./result.html";
});