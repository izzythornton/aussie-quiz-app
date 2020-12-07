/******** QUIZ QUESTION ARRAY ********/

const STORE = {
  questions: [
    {
      question: 'Which of these nicknames is affectionately given to the Australian Shepherd?',
      answers: [
        'The Barkless Dog',
        'The Butterfly Dog',
        'The Velcro Dog',
        'The Speedy Dog'
      ],
      correctAnswer: 'The Velcro Dog'
    },
    {
      question: 'What caused the Aussie popularity boom?',
      answers: [
        'Excellence in sheep herding',
        'Performing in rodeos',
        'Recognition as an ideal family dog',
        'All of the above'
      ],
      correctAnswer: 'Performing in rodeos'
    },
    {
      question: 'What kinds of jobs can an Aussie do?',
      answers: [
        'Herding',
        'Service',
        'Search and rescue',
        'All of the above'
      ],
      correctAnswer: 'All of the above'
    },
    {
      question: 'How many standard coat colors do Aussies have?',
      answers: [
        '4',
        '2',
        '6',
        '3'
      ],
      correctAnswer: '4'
    },
    {
      question: 'Some Australian Shepherds are born without a tail. What are the odds of that happening?',
      answers: [
        '50%',
        '70%',
        '20%',
        '25%'
      ],
      correctAnswer: '20%'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

/****************************************************/
/************** START JAVASCRIPT FUNCTIONS *********/
/**************************************************/

/********** TEMPLATE GENERATION FUNCTIONS **********/

function generateIntroPage() {
  return `
    <div class="intro">
      <p>How much do you know about Aussies? This quiz will check your knowledge of the breed by going over a few fun facts!</p>
      <button type="button" id="start-quiz" name="start-quiz">
      <label for="start-quiz">Get Started</label>
    </div>
    `;
}

function generateStatus() {
  return `
      <div class="status-container">
      <p class="question-counter">Question ${STORE.questionNumber}/5</p>
        <p class="correct-answer-counter">Score: ${STORE.score}</p>
      </div>
    `;
}

function generatePossibleAnswers() {
  let i = STORE.questionNumber;
  const answersArray = STORE.questions[i].answers;
  let html = "";
  html += `
    <div class="answer-container">
    <form>
      <input type="radio" name="possible-answer" id="${answersArray[0]}" value="${answersArray[0]}" required>
      <label for="${answersArray[0]}">${answersArray[0]}</label><br>
      <input type="radio" name="possible-answer" id="${answersArray[1]}" value="${answersArray[1]}" required>
      <label for="${answersArray[1]}">${answersArray[1]}</label><br>
      <input type="radio" name="possible-answer" id="${answersArray[2]}" value="${answersArray[2]}" required>
      <label for="${answersArray[2]}">${answersArray[2]}</label><br>
      <input type="radio" name="possible-answer" id="${answersArray[3]}" value="${answersArray[3]}" required>
      <label for="${answersArray[3]}">${answersArray[3]}</label><br>
    </form>
    </div>
    <form>
      <input type="button" id="check-answer-button" name="check-answer-button" value="Check Answer" onclick="checkAnswer()">
    </form>
  `;
  return html;
} 

function generateQuestion() {
  let currentQuestion = "";
  let i = STORE.questionNumber;
  for (i; i < STORE.questions.length; i++) {
    currentQuestion = STORE.questions[i].question;
    return currentQuestion;
  }
}

// NOT TESTED
function generateFinalScore() {
  return `
      <div class="final-score">
        <p>Awesome, you're all done! You answered ${STORE.score} out of 5 questions correctly.</p>
        <p>Want to try again?</p>
        <form id="try-again">
          <input type="button" id="restart" name="restart" value="Click Here!" onclick="restartQuiz()">
        </form>
      </div>
    `;
}

function correctAnswerFeedback() {
  $(".quiz-container").html(`
    <p>That's correct! Good job.</p>
    <form>
      <input type="button" id="next-question-button" name="next-question-button" value="Next Question" onclick="nextQuestion()">
    </form>
  `);
}

function incorrectAnswerFeedback() {
  $(".quiz-container").html(`
    <p>Not quite! That answer is incorrect.</p>
    <p>The correct answer is ${STORE.questions[STORE.questionNumber].correctAnswer}.</p>
    <form>
      <input type="button" id="next-question-button" name="next-question-button" value="Next Question" onclick="nextQuestion()">
    </form>
  `);
}

/********** RENDER FUNCTION(S) **********/

// TO DO: Add condition for when quiz is completed
function rendering() {
  let html = "";
  if (STORE.quizStarted === false) {
    $(".quiz-container").html(generateIntroPage());
      return;
    } else if (STORE.questionNumber >= 0 && STORE.questionNumber < STORE.questions.length) {
        html = generateStatus();
        html += generateQuestion();
        html += generatePossibleAnswers();
        $(".quiz-container").html(html);
    } else {
        $(".quiz-container").html(generateFinalScore());
  }
}

/********** EVENT HANDLER FUNCTIONS **********/

function startQuiz() {
  $(".quiz-container").on("click", "#start-quiz", function(event) {
    event.preventDefault();
    STORE.quizStarted = true;
    rendering();
  });
}

function checkAnswer() {
  let selectedAnswer = $("input[name=possible-answer]:checked").val();
  let currentQuestion = STORE.questionNumber;
  let correctAnswer = STORE.questions[currentQuestion].correctAnswer;
  if (selectedAnswer === correctAnswer) {
    STORE.score++;
    correctAnswerFeedback();
  } else {
    incorrectAnswerFeedback();
  }
  STORE.questionNumber++;
}

function nextQuestion() {
  rendering();
}

function restartQuiz() {
    STORE.quizStarted = false;
    STORE.questionNumber = 0;
    STORE.score = 0;
    rendering();
}

// Confirmed this does properly render HTML at first
function loadQuiz() {
  rendering();
  startQuiz();
  nextQuestion();
  restartQuiz();
}

$(loadQuiz);