//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 61;
let countdown;
//Questions and Options array
const quizArray = [
    {
        id: "0",
        question: "Who is the fifth president of the Philippines?",
        options: ["Jose P. Laurel","Elpidio Quirino","Manuel Roxas","Diosdado Macapagal"],
        correct: "Manuel Roxas",
    },
    {
        id: "1",
        question: "What is the purpose of blanching vegetables?",
        options: ["To cook them thoroughly","To retain color and halt enzymatic processes","To add flavor","To increase their shelf life"],
        correct: "To retain color and halt enzymatic processes",
    },
    {
        id: "2",
        question: "What is the name of the oldest lake in the world?",
        options: ["Lake Baikal","Lake Superior","Lake Titicaca","Lake Victoria"],
        correct: "Lake Baikal",
    },
    {
        id: "3",
        question: "What type of tree is pictured on the Lebanese flag?",
        options: ["Cedar tree","Olive tree","Palm tree","Pine tree"],
        correct: "Cedar tree",
    },
    {
        id: "4",
        question: "The pitaya fruit is more commonly known by what English name?",
        options: ["Dragon fruit","Kiwifruit","Lychee","Persimmon"],
        correct: "Dragon fruit",
    },
    {
        id: "5",
        question: "Who surpassed Elon Musk as the richest person in the world in 2023 on the Bloomberg Billionaires Index?",
        options: ["Jeff Bezos","Bernard Arnault","Bill Gates","Warren Buffett"],
        correct: "Bernard Arnault",
    }, {
        id: "6",
        question: "What is the most popular sport in the world?",
        options: ["Football (soccer)","Cricket","Basketball","Baseball"],
        correct: "Football (soccer)",
    },
    {
        id: "7",
        question: "In which country does the Roland-Garros tennis tournament take place?",
        options: ["France","Spain","United States","Australia"],
        correct: "France",
    },
    {
        id: "8",
        question: "The United States bought Alaska from which country?",
        options: ["Russia","Canada","Denmark","Sweden"],
        correct: "Russia",
    },
    {
        id: "9",
        question: "Which era marked a switch from agricultural practices to industrial practices?",
        options: ["The Renaissance","The Enlightenment","The Industrial Revolution","The Victorian Era"],
        correct: "The Industrial Revolution",
    },

    {
        id: "10",
        question: "Humans and chimpanzees share roughly how much DNA?",
        options: ["50%","75%","98%","100%"],
        correct: "98%",
    },

    {
        id: "11",
        question: "Which famous British physicist wrote 'A Brief History of Time'?",
        options: ["Stephen Hawking","Richard Feynman","Brian Cox","Paul Dirac"],
        correct: "Stephen Hawking",
    },

    {
        id: "12",
        question: "At what temperature are Celsius and Fahrenheit equal?",
        options: ["-40 C","0 C","100 C","212 F"],
        correct: "-40 C",
    },

    {
        id: "13",
        question: "The Roman numeral CXX is represented by which Arabic number?",
        options: ["120","590","80","380"],
        correct: "120",
    },

    {
        id: "14",
        question: "Which country has the most natural lakes in the world?",
        options: ["Finland","Canada","Russia","United States"],
        correct: "Canada",
    },


];
//Restart Quiz
restart.addEventListener("click", () => {
    initial();
    displayContainer.classList.remove("hide");
    scoreContainer.classList.add("hide");
});
//Next Button
nextBtn.addEventListener(
    "click",
    (displayNext = () => {
        //increment questionCount
        questionCount += 1;
        //if last question
        if (questionCount == quizArray.length) {
            //hide question container and display score
            displayContainer.classList.add("hide");
            scoreContainer.classList.remove("hide");
            //user score
            userScore.innerHTML =
                "Your score is " + scoreCount + " out of " + (questionCount*3); //2 point each
        } else {
            //display questionCount
            countOfQuestion.innerHTML =
                questionCount + 1 + " of " + quizArray.length + " Questions";
            //display quiz
            quizDisplay(questionCount);
            count = 61;
            clearInterval(countdown);
            timerDisplay();
        }
    })
);
//Timer
const timerDisplay = () => {
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;
        if (count == 0) {
            clearInterval(countdown);
            displayNext();
        }
    }, 1000);
};
//Display quiz
const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll(".container-mid");
    //Hide other cards
    quizCards.forEach((card) => {
        card.classList.add("hide");
    });
    //display current question card
    quizCards[questionCount].classList.remove("hide");
};
//Quiz Creation
function quizCreator() {
    //randomly sort questions
    quizArray.sort(() => Math.random() - 0.5);
    //generate quiz
    for (let i of quizArray) {
        //randomly sort options
        i.options.sort(() => Math.random() - 0.5);
        //quiz card creation
        let div = document.createElement("div");
        div.classList.add("container-mid", "hide");
        //question number
        countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Questions";
        //question
        let question_DIV = document.createElement("p");
        question_DIV.classList.add("question");
        question_DIV.innerHTML = i.question;
        div.appendChild(question_DIV);
        //options
        div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
       <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
        quizContainer.appendChild(div);
    }
}
//Checker Function to check if option is correct or not
function checker(userOption) {
    let userSolution = userOption.innerText;
    let question =
        document.getElementsByClassName("container-mid")[questionCount];
    let options = question.querySelectorAll(".option-div");
    //if user clicked answer == correct option stored in object
    if (userSolution === quizArray[questionCount].correct) {
        userOption.classList.add("correct");
        scoreCount+=3;
    } else {
        userOption.classList.add("incorrect");
        //For marking the correct option
        options.forEach((element) => {
            if (element.innerText == quizArray[questionCount].correct) {
                element.classList.add("correct");
            }
        });
    }
    //clear interval(stop timer)
    clearInterval(countdown);
    //disable all options
    options.forEach((element) => {
        element.disabled = true;
    });
}
//initial setup
function initial() {
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 61;
    clearInterval(countdown);
    timerDisplay();
    quizCreator();
    quizDisplay(questionCount);
}
//when user click on start button
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide");
    displayContainer.classList.remove("hide");
    initial();
});
//hide quiz and display start screen
window.onload = () => {
    startScreen.classList.remove("hide");
    displayContainer.classList.add("hide");
};