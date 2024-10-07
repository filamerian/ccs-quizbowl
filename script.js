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
        question: "What is the capital of Australia?",
        options: ["Sydney","Melbourne","Canberra","Brisbane"],
        correct: "Canberra",
    },
    {
        id: "1",
        question: "Which color is formed by mixing red and blue?",
        options: ["Green","Purple","Orange","Yellow"],
        correct: "Purple",
    },
    {
        id: "2",
        question: "How many continents are there on Earth?",
        options: ["5","6","7","8"],
        correct: "7",
    },
    {
        id: "3",
        question: "What is the largest planet in our solar system?",
        options: ["Earth","Mars","Jupiter","Saturn"],
        correct: "Jupiter",
    },
    {
        id: "4",
        question: "Which animal is known for its black and white stripes?",
        options: ["Zebra","Giraffe","Tiger","Panda"],
        correct: "Zebra",
    },
    {
        id: "5",
        question: "What do we call a group of stars that form a pattern in the sky?",
        options: ["Galaxy","Nebula","Constellation","Comet"],
        correct: "Constellation",
    }, {
        id: "6",
        question: "Which season comes after winter?",
        options: ["Spring","Summer","Autumn","Monsoon"],
        correct: "Spring",
    },
    {
        id: "7",
        question: "What is the main function of the heart in our body?",
        options: ["Pumping blood","Digesting food","Breathing","Producing hormones"],
        correct: "Pumping blood",
    },
    {
        id: "8",
        question: "Which famous scientist developed the theory of gravity?",
        options: ["Isaac Newton","Albert Einstein","Marie Curie","Nikola Tesla"],
        correct: "Isaac Newton",
    },
    {
        id: "9",
        question: "What is the symbol for the chemical element oxygen?",
        options: ["O","Ox","O2","Oh"],
        correct: "O",
    },

    {
        id: "10",
        question: "What is the capital of Japan?",
        options: ["Tokyo","Beijing","Seoul","Bangkok"],
        correct: "Tokyo",
    },

    {
        id: "11",
        question: "Who wrote the play 'Hamlet'?",
        options: ["William Wordsworth","William Shakespeare","Jane Austen","Charles Dickens"],
        correct: "William Shakespeare",
    },

    {
        id: "12",
        question: "Which gas do humans primarily exhale during respiration?",
        options: ["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],
        correct: "Carbon dioxide",
    },

    {
        id: "13",
        question: "Which planet is known for its beautiful rings?",
        options: ["Mars","Jupiter","Saturn","Uranus"],
        correct: "Saturn",
    },

    {
        id: "14",
        question: "What is the largest mammal on Earth?",
        options: ["African elephant","Blue whale","Giraffe","Polar bear"],
        correct: "Blue whale",
    },

    {
        id: "15",
        question: "Which scientist is credited with the theory of relativity?",
        options: ["Isaac Newton","Albert Einstein","Marie Curie","Stephen Hawking"],
        correct: "Albert Einstein",
    },

    {
        id: "16",
        question: "What is the largest desert in the world?",
        options: ["Sahara Desert","Gobi Desert","Atacama Desert","Kalahari Desert"],
        correct: "Sahara Desert",
    },

    {
        id: "17",
        question: "What is the chemical symbol for silver?",
        options: ["Si","Ag","Au","Sr"],
        correct: "Ag",
    },

    {
        id: "18",
        question: "Which gas do plants release during photosynthesis?",
        options: ["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],
        correct: "Oxygen",
    },

    {
        id: "19",
        question: "What is the process by which water vapor turns into liquid water?",
        options: ["Condensation","Evaporation","Sublimation","Precipitation"],
        correct: "Condensation",
    },
	
	    {
        id: "20",
        question: "What is the largest organ in the human body?",
        options: ["Liver","Brain","Skin","Heart"],
        correct: "Skin",
    },
	
	    {
        id: "21",
        question: "Which planet is known as the 'Morning Star' or 'Evening Star' due to its brightness?",
        options: ["Venus","Mars","Jupiter","Mercury"],
        correct: "Venus",
    },
	
	    {
        id: "22",
        question: "What is the chemical symbol for sodium?",
        options: ["So","Na","Sn","Ni"],
        correct: "Na",
    },
	
	    {
        id: "23",
        question: "What does 'URL' stand for?",
        options: ["Universal Resource Locator","Uniform Reference Link","User-Related Link","Unified Routing Language"],
        correct: "Universal Resource Locator",
    },
	
	    {
        id: "24",
        question: "The Philippines was a colony for almost 400 years of which European country?",
        options: ["Spain","Portugal","England","France"],
        correct: "Spain",
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
                "Your score is " + scoreCount + " out of " + questionCount;
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
        scoreCount++;
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