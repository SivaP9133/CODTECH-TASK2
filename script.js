const quizData = [
  {
    question: '888+88+8+8=?',
    options: ['889', '988', '1088', '1000'],
    answer: '1000',
  },
  {
    question: 'What is the sum of 130+125+191=?',
    options: ['335', '456', '446', '426'],
    answer: '446',
  },
  {
    question: '50 times of 8 is equal to?',
    options: ['80', '400', '800', '4000'],
    answer: '400',
  },
  {
    question: '110 is divided by 10?',
    options: ['11', '10', '5', 'None of the above'],
    answer: '11',
  },
  {
    question: '3, 6, 9, 12,...,...',
    options: ['11,12', '13,14', '14,16', '15,18'],
    answer: '15,18',
  },
  {
    question: 'What is the next prime number after 5?',
    options: ['3', '9', '7', '6'],
    answer: '7',
  },
  {
    question: '1500 - 712 = ?',
    options: ['788', '778', '768', 'None of the above'],
    answer: '788',
  },
  {
    question: '24 * 2 - 24 =',
    options: ['48', '22', '24', '27'],
    answer: '24',
  },
  {
    question: 'The largest four-digit number is?',
    options: ['1000', '1001', '9999', '10000'],
    answer: '9999',
  },
  {
    question: '-10 is a whole number. True or false?',
    options: ['True', 'False'],
    answer: 'True',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  // Clear previous options
  optionsElement.innerHTML = '';

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = `quiz_${currentQuestion}`; // Ensure unique names for each question
    radio.value = shuffledOptions[i];

    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = ''; // Clear the previous question and options
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector(`input[name="quiz_${currentQuestion}"]:checked`);
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  } else {
    alert('Please select an answer before submitting!');
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';

  resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}<br><br>
      </p>
    `;
  }

  resultContainer.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p><strong>Incorrect Answers:</strong></p>
    ${incorrectAnswersHtml}
  `;
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

// Start the quiz
displayQuestion();