function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

var questions = [
    {
        question: "What makes sure no one branch is too powerful?",
        choices: ["a: Checks and Balances", "b: Popular Sovereignty", "c: Federalism"],
        answer: "a"
    },
    {
        question: "Which principle ensures that the government's authority is derived from the people?",
        choices: ["a: Checks and Balances", "b: Popular Sovereignty", "c: Federalism"],
        answer: "b"
    },
    {
        question: "Which principle ensures that the government must follow the law?",
        choices: ["a: Rule of Law", "b: Separation of Powers", "c: Rights and Responsibilities"],
        answer: "a"
    },
    {
        question: "Which principle divides the government into branches to prevent one from becoming too powerful?",
        choices: ["a: Rule of Law", "b: Separation of Powers", "c: Participation"],
        answer: "b"
    },
    {
        question: "Which principle encourages citizens to actively engage in their government?",
        choices: ["a: Sovereignty", "b: Participation", "c: Rights and Responsibilities"],
        answer: "b"
    }
    // Add more questions here
];

questions = shuffle(questions);

for (var i = 0; i < questions.length; i++) {
    questions[i].choices = shuffle(questions[i].choices);
}

var currentQuestionIndex = 0;
var score = 0;

function displayQuestion() {
    var questionObj = questions[currentQuestionIndex];
    document.querySelector('h2').innerText = "Question " + (currentQuestionIndex + 1);
    document.querySelector('p').innerHTML = "<strong>Question: </strong>" + questionObj.question;

    var choicesHtml = "";
    for (var i = 0; i < questionObj.choices.length; i++) {
        choicesHtml += '<div class="form-check">';
        choicesHtml += '<input class="form-check-input" type="radio" name="answer" id="' + String.fromCharCode(97 + i) + '" value="' + String.fromCharCode(97 + i) + '">';
        choicesHtml += '<label class="form-check-label" for="' + String.fromCharCode(97 + i) + '">' + questionObj.choices[i].split(":")[1] + '</label>';
        choicesHtml += '</div>';
    }

    document.querySelector('form').innerHTML = choicesHtml;
}

function checkAnswer() {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("Please select an answer.");
        return;
    }

    var userAnswer = selectedAnswer.value.toLowerCase();
    var question = questions[currentQuestionIndex];

    if (userAnswer === question.answer) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    document.querySelector('.quiz-container').style.display = 'none';
    var scoreContainer = document.createElement('div');
    scoreContainer.classList.add('score-container');
    var scoreText = document.createTextNode('Your score: ' + score + ' out of ' + questions.length);
    scoreContainer.appendChild(scoreText);
    document.body.appendChild(scoreContainer);
}

window.onload = function () {
    displayQuestion();
};
