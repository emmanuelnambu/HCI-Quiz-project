const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const studentNameElement = document.getElementById('student-name');
const studentNumberElement = document.getElementById('student-number');




let shuffledQuestions, currentQuestionIndex;
let score = 0;
let studentName = '';
let studentNumber = '';
let quizEnded = false;





function startTimer(duration, callback) {
  let timeLeft = duration;
  const intervalId = setInterval(() => {
    timerElement.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0 || quizEnded) {
      clearInterval(intervalId);
      callback();
    } else {
      timeLeft--;
    }
  }, 1000);
}


startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  // Get the values of student name and number
  studentName = studentNameElement.value;
  studentNumber = studentNumberElement.value;
  // Hide the start button and show the next button
  startButton.style.display="none";
  nextButton.style.display="block";
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  quizEnded = false; 
  timerElement.style.display = 'block';
  questionContainer.classList.remove('hide');
  setNextQuestion();

  /*const duration = 30; // in seconds
  startTimer(duration, () => {
    // callback function to be executed when timer ends
    feedbackElement.innerText = `You scored ${score} out of ${questions.length}!`;
feedbackElement.classList.remove('hide');

 //renderChart();

 updateScoreChart()
  });*/ 
  startTimer(30, endQuiz);
  
}


function endQuiz() {
  quizEnded = true; // added this line
  timerElement.textContent = 'Time up!';
  nextButton.style.display = 'none';
  feedbackElement.innerHTML = `You got ${score} out of ${questions.length} questions correct.`;
  updateScoreChart();
}


function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      feedbackElement.innerText = `You scored ${score} out of ${questions.length}!`;
      feedbackElement.classList.remove('hide');
      nextButton.classList.add('hide');
    }
    
  }
  
  function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('answer-button');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  }
  
  function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct);
    if (correct) {
      score++;
    }
    
    Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.dataset.correct);
    });
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide');
    } else {
      startButton.innerText = 'Restart';
      startButton.classList.remove('hide');
    }
  }
  
  function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
      element.classList.add('correct');
    } else {
      element.classList.add('wrong');
    }
  }
  
  function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
  }


  /*function renderChart() {
    const data = {
      labels: ['Correct Answers', 'Wrong Answers'],
      datasets: [
        {
          label: 'Quiz Results',
          data: [score, questions.length - score],
          backgroundColor: ['#4CAF50', '#F44336'],
        },
      ],
    };


    const config = {
      type: 'pie',
      data,
    };
  
    const ctx = document.getElementById('chart').getContext('2d');
    new Chart(ctx, config);
  }
  */
  function updateScoreChart() {
    const chartElement = document.getElementById('chart');
    const chart = new Chart(chartElement, {
      type: 'pie',
      data: {
        labels: [`${studentName} (${studentNumber}) Correct`, `${studentName} (${studentNumber}) Wrong`],
        datasets: [{
          label: 'Score',
          data: [score, questions.length - score],
          backgroundColor: [
            'rgba(75, 192, 75, 0.6)',
            'rgba(255, 99, 71, 0.6)',
          ],
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Score Chart'
          }
        }
      }
    });
    document.getElementById('score-chart').innerHTML = chart.canvas.outerHTML;
  }
  

  
  const questions = [  {    question: 'What is the name of the electric car company founded by Elon Musk?',    answers: [      { text: 'Tesla', correct: true },      { text: 'Kia', correct: false }    ]
},
{
question :'Which tech giant recently announced a new smartwatch called the Pixel Watch?',
answers:[
 { text: 'Samsung', correct: false },
 { text: 'Apple', correct: false },
 { text: 'Google', correct: true },
 { text: 'Tecno', correct: false }
]
 },

{
question: 'Which company was responsible for the widely publicized data breach in which the personal information of millions of Facebook users was accessed without authorization?',
answers: [
 { text: 'Twitter', correct: false },
 { text: 'Cambridge Analytica', correct: true },
 { text: 'Amazon', correct: false },
 { text: 'Google', correct: false }
]
},

{
  question:'What is the name of the artificial intelligence-powered voice assistant that powers Apples devices?',
  answers:[
{ text: 'Google Assistant', correct: false },
{ text: 'Alexa', correct: false },
{ text: 'Siri', correct: true },
{ text: 'Cortana', correct: false }
]
},
{
  question: 'Which tech company recently surpassed Saudi Aramco to become the worlds most valuable publicly traded company?',
  answers: [
    { text: 'Apple', correct: true },
    { text: 'Alphabet (Google)', correct: false },
    { text: 'Amazon', correct: false },
    { text: 'Microsoft', correct: false }
  ]
},
{
question: 'What is the name of the social media platform that was recently banned in India due to concerns over national security and privacy?',
 answers: [
 { text: 'TikTok', correct: true },
 { text: 'Facebook', correct: false },
 { text: 'Instagram', correct: false },
 { text: 'Twitter', correct: false }
 ]
},

{
question: 'What is the name of the virtual reality headset developed by Facebook that allows users to experience immersive gaming and other experiences?',
 answers:[
  { text: 'Oculus Quest', correct: true },
  { text: 'PlayStation VR', correct: false },
  { text: 'HTC Vive', correct: false },
  { text: 'Google Cardboard', correct: false }
 ]
},

{
question: 'What is the name of the cryptocurrency that recently experienced a surge in value, reaching an all-time high of over $60,000 per coin?',
 answers:[
 { text: 'Ethereum', correct: false },
 { text: 'Bitcoin', correct: true },
 { text: 'Dogecoin', correct: false },
 { text: 'Ripple', correct: false }
 ]
},
{
question: 'Which tech giant recently announced plans to invest $10 billion in India over the next five years as part of an effort to expand its digital footprint in the country?',
 answers:[
   { text: 'Microsoft', correct: false },
   { text: 'Google', correct: true },
   { text: 'Amazon', correct: false },
   { text: 'Apple', correct: false }
 ]
},
{
question:'What is the name of the electric car company founded by Chinese billionaire entrepreneur, Li Xiang, that recently went public on the NASDAQ?',
 Answers:[
{ text: 'Rivian', correct: false },
{ text: 'Lucid Motors', correct: false },
{ text: 'Tesla', correct: false },
{ text: 'NIO', correct: true }
 ]
}
  ]