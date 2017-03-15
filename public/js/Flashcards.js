(function(){

var form = document.getElementById("flashcard-form");
var words = [];
var index = 0;

$.get(
    "http://localhost:3000/flashcards/words",
    function(data, status){
        console.log(status);
        //console.log(data);
        words = data.words;
        //console.log(words);
        document.getElementById("mainWord").textContent = words[index].word;
        document.getElementById("meaning").textContent = words[index].meaning;
        document.getElementById("usage").innerText = words[index].usage;
        document.getElementById("synonym").innerText = words[index].synonym;
        document.getElementById("antonym").innerText = words[index].antonym;
        
//        document.getElementById("mainWord").value = words.word;
//        document.getElementById("meaning").value = words.meaning;
//        document.getElementById("usage").value = words.usage;

    }
);


var nextButton = $("#nextButton");
nextButton.click(function () {

    index++;
    console.log("Index in next click" + index);
    if (index < words.length) {

        document.getElementById("mainWord").textContent = words[index].word;
        document.getElementById("meaning").textContent = words[index].meaning;
        document.getElementById("usage").innerText = words[index].usage;
        document.getElementById("synonym").innerText = words[index].synonym;
        document.getElementById("antonym").innerText = words[index].antonym;

    }

});

var previousButton = $("#previousButton");
previousButton.click(function () {

    index--;
    console.log("Index in next click" + index);
    if (index >= 0) {

        document.getElementById("mainWord").textContent = words[index].word;
        document.getElementById("meaning").textContent = words[index].meaning;
        document.getElementById("usage").innerText = words[index].usage;
        document.getElementById("synonym").innerText = words[index].synonym;
        document.getElementById("antonym").innerText = words[index].antonym;

    }
});

/*
window.onunload(
    function(){
        document.cookie = "session_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
);
*/
})();

