(function(){

var form = document.getElementById("tests-form");
console.log("Reached here");
var questions = [];
var questionCount = 1;
var correctCount = 0;
var no_response = 0;
var index1 = 0;
var options = {
    option1: "",
    option2: "",
    option3: "",
    option4: ""
};
var currentQuestionId;
var currentCorrectAnswer;
var resultArray = [];
var totalQuestions = 0;

var seconds_left = 21;
var interval = setInterval(function () {
    if (seconds_left > 11) {
        document.getElementById('timer').innerHTML = "00:" + --seconds_left;
    }
    else {
        document.getElementById('timer').innerHTML = "00:0" + --seconds_left;
    }
    if (seconds_left <= 0) {
        document.getElementById('timer').innerHTML = 'Time over';
        //clearInterval(interval);
        getResult();
    }
}, 1000);


function getResult()
{
    var isCorrect = false;
    //console.log("In submit Answer");
    var answer_value = "";
    if (document.getElementById("opt1").checked) {
        answer_value = document.getElementById("option1").textContent;
        $("#opt1").prop("checked",false);
    }
    else if (document.getElementById("opt2").checked) {
        answer_value = document.getElementById("option2").textContent;
        $("#opt2").prop("checked",false);        
    }
    else if (document.getElementById("opt3").checked) {
        answer_value = document.getElementById("option3").textContent;
        $("#opt3").prop("checked",false);        
    }
    else if (document.getElementById("opt4").checked) {
        answer_value = document.getElementById("option4").textContent;
        $("#opt4").prop("checked",false);        
    }
    else{
        answer_value = "No Response";
        no_response++;
    }

    console.log("The answer selected is: " + answer_value);
    
    if(answer_value === currentCorrectAnswer)
    {
        isCorrect = true;
        correctCount++;
    }
    console.log("correctCount is : " + correctCount);
    resultArray.push({
        questionId: currentQuestionId,
        answer: answer_value,
        correctAnswer: currentCorrectAnswer,
        isCorrect: isCorrect,
        questionCount: questionCount,
        timeTaken : 20 - seconds_left
    });

    index1++;
    questionCount++;
    
    if (index1 < questions.length) {

        document.getElementById("question").textContent = questions[index1].question;
        document.getElementById("questionCountNumber").textContent = questionCount + "/" + totalQuestions;
        document.getElementById("option1").textContent = questions[index1].options[0];
        options.option1 = questions[index1].options[0];
        document.getElementById("option2").textContent = questions[index1].options[1];
        options.option2 = questions[index1].options[1];
        document.getElementById("option3").textContent = questions[index1].options[2];
        options.option3 = questions[index1].options[2];
        document.getElementById("option4").textContent = questions[index1].options[3];
        options.option4 = questions[index1].options[3];
        currentQuestionId = questions[index1].question_id;
        currentCorrectAnswer = questions[index1].correctAnswer;
        seconds_left = 21;
    }
    else{
        seconds_left = 0;
        clearInterval(interval);
        $.post("http://localhost:3000/loginpage/results",{resultArray : resultArray, correctCount: correctCount, no_response: no_response},
        function(result)
        {
            document.close();
            console.log(result);
            document.write(result);
        });
    }
};


$.get(
    "http://localhost:3000/tests/questionList",
    function(data, status){
        //console.log(status);
        //console.log(data);
        questions = data.questions;
        totalQuestions = questions.length;
        //console.log("In here : =----------" + questions);
        
        document.getElementById("question").textContent = questions[index1].question;
        document.getElementById("questionCountNumber").textContent = questionCount + "/" + totalQuestions;
        document.getElementById("option1").textContent = questions[index1].options[0];
        options.option1 = questions[index1].options[0];
        document.getElementById("option2").textContent = questions[index1].options[1];
        options.option2 = questions[index1].options[1];        
        document.getElementById("option3").textContent = questions[index1].options[2];
        options.option3 = questions[index1].options[2];
        document.getElementById("option4").textContent = questions[index1].options[3];
        options.option4 = questions[index1].options[3];
        currentQuestionId = questions[index1].question_id;
        currentCorrectAnswer = questions[index1].correctAnswer;
        //var options = questions[index1].options;
        seconds_left = 21;
    }
);     


var nextButton = $("#nextButtonforTests");
nextButton.click(function () {
          getResult();
});


/*
window.onunload(
    function(){
        document.cookie = "session_id=;";
        
    }
);
*/

})();

