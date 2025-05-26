// script.js

// --- Quiz Questions Data ---
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswerIndex: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswerIndex: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswerIndex: 3
    },
    {
        question: "What is the chemical symbol for water?",
        options: ["O2", "H2O", "CO2", "NaCl"],
        correctAnswerIndex: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
        correctAnswerIndex: 2
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Quartz"],
        correctAnswerIndex: 2
    },
    {
        question: "Which country is famous for the Great Wall?",
        options: ["India", "Japan", "China", "Egypt"],
        correctAnswerIndex: 2
    },
    {
        question: "What is the primary gas that makes up the Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correctAnswerIndex: 2
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correctAnswerIndex: 2
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correctAnswerIndex: 2
    }
];

// --- Game State Variables ---
let currentQuestionIndex = 0;
let score = 0;
let quizStarted = false; // To control initial visibility

// --- DOM Elements ---
const gameContainer = document.querySelector('.game-container');
const startScreen = document.getElementById('start-screen');
const startQuizBtn = document.getElementById('start-quiz-btn');
const quizScreen = document.getElementById('quiz-screen');
const questionProgress = document.getElementById('question-progress');
const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtonsContainer = document.getElementById('answer-buttons');
const feedbackMessage = document.getElementById('feedback-message');
const resultScreen = document.getElementById('result-screen');
const finalScoreDisplay = document.getElementById('final-score');
const resultMessage = document.getElementById('result-message');
const playAgainBtn = document.getElementById('play-again-btn');

// --- Utility Functions ---

/**
 * Initializes the game by setting up event listeners and showing the start screen.
 */
function initGame() {
    startQuizBtn.addEventListener('click', startGame);
    playAgainBtn.addEventListener('click', resetGame);

    // Initial state: show start screen, hide others
    startScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');

    // Animate game container in after initial load
    setTimeout(() => {
        gameContainer.classList.add('loaded');
    }, 100); // Small delay to ensure CSS transition works
}

/**
 * Starts the quiz, hides the start screen, and loads the first question.
 */
function startGame() {
    quizStarted = true;
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

/**
 * Loads and displays the current question and its options.
 * Applies animations to the question text and answer buttons.
 */
function loadQuestion() {
    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];
        questionProgress.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

        // Clear previous animations and content
        questionContainer.classList.remove('question-animation');
        void questionContainer.offsetWidth; // Trigger reflow to restart animation
        questionText.textContent = ''; // Clear text immediately for animation
        answerButtonsContainer.innerHTML = '';
        feedbackMessage.textContent = '';

        // Animate question text in
        questionText.textContent = currentQuestion.question;
        questionContainer.classList.add('question-animation');

        // Create and animate answer buttons
        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add(
                'answer-btn',
                'bg-gray-700', 'hover:bg-gray-600', 'text-white', 'font-semibold',
                'py-3', 'px-6', 'rounded-lg', 'shadow-md', 'transition-all', 'duration-200',
                'transform', 'hover:scale-105', 'active:scale-95', 'border-b-4', 'border-gray-900',
                'text-left' // Align text left within button
            );
            button.style.animationDelay = `${index * 0.1}s`; // Stagger animation
            button.addEventListener('click', () => checkAnswer(index));
            answerButtonsContainer.appendChild(button);
        });
    } else {
        showResults();
    }
}

/**
 * Checks the selected answer, provides feedback, and moves to the next question or results.
 * @param {number} selectedOptionIndex - The index of the option selected by the user.
 */
function checkAnswer(selectedOptionIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    const answerButtons = Array.from(answerButtonsContainer.children);

    // Disable all buttons to prevent multiple clicks
    answerButtons.forEach(button => {
        button.disabled = true;
        button.classList.add('opacity-70', 'cursor-not-allowed');
    });

    if (selectedOptionIndex === currentQuestion.correctAnswerIndex) {
        score++;
        feedbackMessage.textContent = "Correct!";
        feedbackMessage.classList.remove('text-red-500');
        feedbackMessage.classList.add('text-green-400');
        answerButtons[selectedOptionIndex].classList.add('correct-answer');
    } else {
        feedbackMessage.textContent = "Incorrect!";
        feedbackMessage.classList.remove('text-green-400');
        feedbackMessage.classList.add('text-red-500');
        answerButtons[selectedOptionIndex].classList.add('incorrect-answer');
        // Highlight the correct answer
        answerButtons[currentQuestion.correctAnswerIndex].classList.add('correct-answer');
    }

    // Move to next question after a short delay
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500); // 1.5 seconds delay for feedback
}

/**
 * Displays the final results screen.
 */
function showResults() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreDisplay.textContent = score;

    let message = "";
    if (score === questions.length) {
        message = "Outstanding! You are a true IronMind!";
        resultMessage.classList.remove('text-red-400');
        resultMessage.classList.add('text-green-400');
    } else if (score >= questions.length / 2) {
        message = "Well done! You've got a strong mind.";
        resultMessage.classList.remove('text-red-400');
        resultMessage.classList.add('text-yellow-400');
    } else {
        message = "Keep learning! Your IronMind can grow stronger.";
        resultMessage.classList.remove('text-green-400', 'text-yellow-400');
        resultMessage.classList.add('text-red-400');
    }
    resultMessage.textContent = message;
}

/**
 * Resets the game to its initial state, ready to play again.
 */
function resetGame() {
    currentQuestionIndex = 0;
    score = 0;
    quizStarted = false;
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
    feedbackMessage.textContent = ''; // Clear any lingering feedback
    gameContainer.classList.remove('loaded'); // Reset animation state for container
    setTimeout(() => {
        gameContainer.classList.add('loaded'); // Re-animate container on restart
    }, 100);
}

// --- Initialize the game when the DOM is fully loaded ---
document.addEventListener('DOMContentLoaded', initGame);
