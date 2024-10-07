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
        question: "How many bones are there in the adult human body?",
        options: ["186","206","226","246"],
        correct: "206",
    },
    {
        id: "1",
        question: "In which novel does the character Atticus Finch appear?",
        options: ["Catcher in the Rye","To Kill a Mockingbird","The Great Gatsby","1984"],
        correct: "To Kill a Mockingbird",
    },
    {
        id: "2",
        question: "What is the currency code of Greece?",
        options: ["DKM","DKK","RPN","EUR"],
        correct: "EUR",
    },
    {
        id: "3",
        question: "What platform is the most often used for video game live streaming?",
        options: ["Twitch","YouTube","Facebook Live","Vimeo"],
        correct: "Twitch",
    },
    {
        id: "4",
        question: "Which spice is known as 'queen of spices'?",
        options: ["Cinnamon","Cardamom","Nutmeg","Black pepper"],
        correct: "Cardamom",
    },
    {
        id: "5",
        question: "Which breed of dog is known for its excellent sense of smell and tracking abilities?",
        options: ["Golden Retriever","German Shepherd","Bloodhound","Bulldog"],
        correct: "Bloodhound",
    }, {
        id: "6",
        question: "What part of the brain is responsible for memory and learning?",
        options: ["Cerebellum","Hypothalamus","Hippocampus","Medulla oblongata"],
        correct: "Hippocampus",
    },
    {
        id: "7",
        question: "What part of the body does an otolaryngologist specialize in?",
        options: ["Heart","Brain","Ear, nose, and throat","Kidneys"],
        correct: "Ear, nose, and throat",
    },
    {
        id: "8",
        question: "What is the main function of red blood cells?",
        options: ["Carrying oxygen","Fighting infections","Clotting blood","Regulating body temperature"],
        correct: "Carrying oxygen",
    },
    {
        id: "9",
        question: "What is the medical term for high blood pressure?",
        options: ["Hypotension","Hypertension","Hyperglycemia","Acidosis"],
        correct: "Hypertension",
    },

    {
        id: "10",
        question: "Who created the hierarchy of needs?",
        options: ["Sigmund Freud","B.F. Skinner","Abraham Maslow","Carl Rogers"],
        correct: "Abraham Maslow",
    },

    {
        id: "11",
        question: "What is the average lifespan of a domestic cat?",
        options: ["5-8 years","10-15 years","15-20 years","20-25 years"],
        correct: "10-15 years",
    },

    {
        id: "12",
        question: "In which city is the Eiffel Tower located?",
        options: ["London","Berlin","Paris","Rome"],
        correct: "Paris",
    },

    {
        id: "13",
        question: "Who wrote 'The Odyssey'?",
        options: ["Homer","Virgil","Sophocles","Euripides"],
        correct: "Homer",
    },

    {
        id: "14",
        question: "Which country has the most islands in the world?",
        options: ["Philippines","Indonesia","Canada","Sweden"],
        correct: "Sweden",
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
                "Your score is " + scoreCount + " out of " + (questionCount*2); //2 point each
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
        scoreCount+=2;
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