/* We will define an empty, class-level array of questionObjects to add questions to directly from the json file */
let questionObjects = [];

/* In window.onload, we will use this code to get the information directly from the json file */
/* You can use a shortcut snippet to paste this code out by just typing 'ajax' */

window.onload = function () {
  let url = "../Quizzes/GeographyQuiz.json"; // file we want to read
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
  // code 200 means the server succeeded in retrieving the resource
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      console.log(xhr.responseText); // do something when server responds

      // defining the data
      let data = JSON.parse(xhr.responseText);
      // getting questions, options, and title from JSON file
      let objects = data.questions;
      let title = data.title;
      // setting those objects to be in the array
      questionObjects = objects;

      // functions to load 
      loadQuiz();
      loadTitle(title);
      loadTabs();
      loadTabContent();
      addActiveButton();
      addActiveContent();

      }
  };

  xhr.open("GET", url, true); // must use “GET” method
  xhr.send();
}    
  
  // Function to load the quiz questions
  function loadQuiz(a) {
    // change to query selector -> IT MUST BE INTO THE QUERY SELECT OF EACH TAB SO PILLS-Q1, PILLS-Q2...
    let questionHTML = '';
    
    for (let i = a - 1; i < questionObjects.length; i++) {
      let temp = questionObjects[i];
      questionHTML += "<div class='questionContainer'>";
      questionHTML += '<div class="question">';
      questionHTML += "<h2>" + "Question " + (i + 1) + "</h2>";
      questionHTML += '<p class="q">' + temp.questionText + '</p>';
      questionHTML += '<div id="container">';
      questionHTML += '<div class="choices">';
        for (let j = 0; j < temp.choices.length; j++) {
          let options = questionObjects[i].choices[j];
          questionHTML += '<div class="answer"><input type="radio" name="answer' + i + '" value="' + options + '>"' + "<label class=" + "answerLabel" + "/>" + options + "</label></div>" + "<br>";
        }
      questionHTML += '</div></div></div></div>';
      return questionHTML;
    }
  }

  //TODO: Write a function that will get each question on its own tab, so make a tab, and in that function, you can use the loadQuiz -> DONE
  // Interesting thing to note with a, i, i + 1, etc. 

  //aria-controls AND data-bs-target are both pills-q1, ID of button: pills-q1-tab.

  function addActiveButton() {
    let activeBtn = document.querySelector("#pills-q1-tab");
    activeBtn.classList.add("active");
  }

  // only first tab-pane should have active and show class. the rest should not have it
  function addActiveContent() {
    let activeContent = document.querySelector("#pills-q1");
    activeContent.classList.add("show");
    activeContent.classList.add("active");
  }

  // FOR BUTTON: ID: pills-q#-tab. Data-bs-target: pills-q#, Aria-controls: pills-q#. 
  // FOR CONTENT: ID: pills-q#, aria-labelledby: pills-q#-tab 
  function loadTabs() {
    let tab = document.querySelector("#pills-tab");
    for (let i = 1; i <= questionObjects.length; i++) {
      tab.innerHTML += '<li class="nav-item" role="presentation">';
      tab.innerHTML += '<button class="nav-link" id="pills-q' + i + '-tab"'
      + 'data-bs-toggle="pill" data-bs-target="#pills-q' + i 
      + '" type="button" role="tab" aria-controls="pills-q' + i 
      + '" aria-selected="false">' + 'Question ' + i + '</button>';
      tab.innerHTML += '</li>';
    }
    // For first item, aria-selected must be true, but I don't see any visible difference if it's false
    // For like an hour, I was not able to switch content on the tab. Turns out, from data-bs-target, I was missing the # in front of pills-q. lol
  }

  function loadTabContent() {
    let tabContent = document.querySelector("#pills-tabContent");
    for (let i = 1; i <= questionObjects.length; i++) {
      tabContent.innerHTML += '<div class="tab-pane fade" id="pills-q' + i + '" role="tabpanel" aria-labelledby="pills-q' + i + '-tab">' + loadQuiz(i) + '</div>';
    }
  }
  
  function loadTitle(a) {
    let heading = document.querySelector("#quizHeading");
    heading.innerHTML = a;
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
  
