/* We will define an empty, class-level array of questionObjects to add questions to directly from the json file */
let questionObjects = [];
let userAnswers = [];

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

      let btn = document.querySelector(".btn");
      btn.addEventListener("click", submitQuiz);

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
          questionHTML += '<div class="answer"><input type="radio" name="answer' + i + '" value="' + options + '">' + "<label class=" + "answerLabel" + "/>" + options + "</label></div>" + "<br>";
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

  // repeated code: allButtons - doesn't work when class-level - look into it

  function checkForMissingAnswers() {
    // loop through
    let check = false;
    let allButtons = document.querySelectorAll("input[type='radio']");
    // Loop through every radio button in the document
    for (let i = 0; i < allButtons.length; i++) {
      let selectedOptions = document.querySelectorAll('input[name="answer' + i + '"]');
      for (let j = 0; j < selectedOptions.length; j++) {
        // if all are not checked
        // if one is checked, then set check to true!
        if (selectedOptions[j].checked) {
          check = true;
          break;
        }
        else {
          check = false;
        }
      }
    }
    return check;
  }

  // I got the checkForMissingAnswers function working!!

  function recordAnswers() {
    // This logs to the console whatever you've checked
    let check = false;
    let allButtons = document.querySelectorAll("input[type='radio']");
    // Loop through every radio button in the document
    for (let i = 0; i < allButtons.length; i++) {
      let selectedOptions = document.querySelectorAll('input[name="answer' + i + '"]');
      for (let j = 0; j < selectedOptions.length; j++) {
        // if all are not checked
        // if one is checked, then set check to true!
        if (selectedOptions[j].checked) {
          check = true;
          console.log(selectedOptions[j]);
          console.log('checked');
        }
      }
    }
  }

  function calculateScore() {

  }

  function makeResultsTable() {
    let table = document.querySelector("#tableContainer");
    let allButtons = document.querySelectorAll("input[type='radio']:checked");
    html = "<h2>Details</h2>";
    html += "<table>";
    html += "<tr><th>Question #</th>";
    html += "<th>Question Text</th>";
    html += "<th>Correct Answer</th>";
    html += "<th>Your Answer</th>";
    html += "<th>Score</th></tr>";
    for (i = 0; i < questionObjects.length; i++) {
      html += "<tr>";
      let temp = questionObjects[i];
      html += "<td>" + "Question " + (i + 1) + "</td>";
      html += "<td>" + temp.questionText + "</td>";
      html += "<td>" + temp.choices[temp.answer] + "</td>";
      html += "<td>" + allButtons[i].value + "</td>";
      html += "<td>" + scores[i] + "</td>";
      html += "</tr>";
    }
    html += "</table>";
    table.innerHTML = html;
  }

  // I want to make an array of 0 , 1, 0 .. scores
  // createScoreArray
  // from this we're going to add the 0 or 1 to the correct answers sum 

  const scores = [];

  function makeScoreArray() {
    // Loop through checked buttons
    let checkedBtns = document.querySelectorAll("input[type='radio']:checked");
    for (let i = 0; i < checkedBtns.length; i++) {
      let temp = questionObjects[i];
      // const selectedOptions = document.querySelectorAll('input[name="answer' + i + '"]:checked');
      // rather use checkedBtns, because selectedOptions checks the group specifically, and it would only return one answer, why?

      // console.log('Answer index:' + temp.answer);
      // console.log('Actual answer:' + temp.choices[temp.answer]);
      // console.log('Selected answer:' + checkedBtns[i].value);
      // Check if the selected answer is equal to the answer at that value (temp.answer) index of the choices array
      if (checkedBtns[i].value == temp.choices[temp.answer]) {
          scores[i] = 1;
      }
      else {
        scores[i] = 0;
      }
    }
    console.log(scores);
    return scores;
  }

  function calculateScore(scoreArray) { // Calculate score based on score array
    let score = 0;
    for (let i = 0; i < scoreArray.length; i++) {
      // console.log(scoreArray[i]);
      if (scoreArray[i] == 1) {
        score++;
      }    
    }
    return score;  
  }

  function displayResult(result) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = 'You got ' + result + ' out of ' + questionObjects.length + ' correct!';
  }

  // Function to handle quiz submission and calculate the score
  function submitQuiz() {
    valid = checkForMissingAnswers();
    if (valid == false) {
      alert("You didn't answer all questions");
    }
    else {
      let resultArray = makeScoreArray();
      let result = calculateScore(resultArray);
      displayResult(result);
      makeResultsTable();
    }
  }

  //TODO: Get the MakeTable function making a table of the Question #, Question Text, Your Answer, and the Correct Answer
  //TODO: Shall we make an array of answers 1 0 1 1 0 for right/wrong answer
  //TODO: For all wrong answers, change the color - add class .incorrect

