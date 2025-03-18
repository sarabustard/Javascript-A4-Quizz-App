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
      loadTitle(title);
      loadQuiz();
      }
  };

  xhr.open("GET", url, true); // must use “GET” method
  xhr.send();
}    
  
  // Function to load the quiz questions
  function loadQuiz() {
    // change to query selector
    const quizForm = document.getElementById('quizForm'); 
    let questionHTML = '';
    
    for (let i = 0; i < questionObjects.length; i++) {
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
    }
    quizForm.innerHTML = questionHTML;
  }
  
  function loadTitle(a) {
    let heading = document.querySelector("#quizHeading");
    heading.innerHTML = a;
  }
