const quizData = {
    "title": "Geography Quiz",
    "questions": [
      {
        "questionText": "Which of the following countries does NOT border the Mediterranean Sea?",
        "choices": ["Egypt", "France", "Jordan", "Turkey"],
        "answer": 2
      },
      {
        "questionText": "Where is Mount Everest?",
        "choices": ["Bangladesh", "Cambodia", "India", "Nepal"],
        "answer": 3
      },
      {
        "questionText": "Which of the following is the name of an independent country?",
        "choices": ["Albania", "Alberta", "America", "Athabaska"],
        "answer": 0
      },
      {
        "questionText": "Which of the following countries is NOT in South America?",
        "choices": ["Argentina", "Botswana", "Colombia", "Venezuela"],
        "answer": 1
      },
      {
        "questionText": "Which of the Great Lakes is wholly contained in the USA?",
        "choices": [
          "Lake Erie",
          "Lake Huron",
          "Lake Michigan",
          "Lake Ontario",
          "Lake Superior"
        ],
        "answer": 2
      },
      {
        "questionText": "Which country's flag does NOT contain the colour red?",
        "choices": ["Pakistan", "Philippines", "Poland", "Portugal"],
        "answer": 0
      },
      {
        "questionText": "What is the former name of Istanbul?",
        "choices": ["Campala", "Carthage", "Constantinople", "Crete"],
        "answer": 2
      },
      {
        "questionText": "The Great Barrier Reef is closest to which country?",
        "choices": ["Australia", "Indonesia", "Japan", "Peru"],
        "answer": 0
      },
      {
        "questionText": "Which of the following rivers is the longest?",
        "choices": [
          "The Danube River",
          "The Saint Lawrence River",
          "The Volga River",
          "The Yellow River"
        ],
        "answer": 3
      },
      {
        "questionText": "Where is the Shwedagon Pagoda?",
        "choices": ["Laos", "Myanmar", "Sri Lanka", "Thailand", "Vietnam"],
        "answer": 1
      }
    ]
  };
  
  // Function to load the quiz questions
  function loadQuiz() {
    // change to query selector
    const quizForm = document.getElementById('quizForm');
    const questions = quizData.questions;
    let questionHTML = '';
    
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      questionHTML += '<div class="question">';
      questionHTML += '<p>' + question.questionText + '</p>';
      questionHTML += '<div class="choices">';
      
      for (let j = 0; j < question.choices.length; j++) {
        questionHTML += '<label><input type="radio" name="question' + i + '" value="' + j + '">' + question.choices[j] + '</label><br>';
      }
  
      questionHTML += '</div></div>';
    }
  
    quizForm.innerHTML = questionHTML;
  }
  
  // Function to handle quiz submission and calculate the score
  function submitQuiz() {
    // change to query selector
    const form = document.getElementById('quizForm');
    let score = 0;
    const questions = quizData.questions;
    
    for (let i = 0; i < questions.length; i++) {
      const selectedOption = form.querySelector('input[name="question' + i + '"]:checked');
      
      if (selectedOption && parseInt(selectedOption.value) === questions[i].answer) {
        score++;
      }
    }
   // change to query selector
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'You got ' + score + ' out of ' + questions.length + ' correct!';
  }
  
  // Load the quiz when the page is loaded
  window.onload = loadQuiz;