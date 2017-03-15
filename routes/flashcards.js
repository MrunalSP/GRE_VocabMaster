const express = require('express');
const router = express.Router();
const data = require('../data');
const vocabData = data.vocab;
const sessionData = data.sessions;
var cookieParser = require('cookie-parser');

router.get("/", (req, res) => {
//    sessionData.getSessionBySessionId(req.cookies.session_id).then(
//        function (sessionInfo){
            console.log("Session Valid");
//            res.render("flashcards/home", {partial: "Flashcards-partial", firstName: sessionInfo.firstName, lastName: sessionInfo.lastName});
            res.render("flashcards/home", {partial: "Flashcards-partial"});
//        },
//        function(error) {
//            res.status(404).json({ success: false, error: "User not found" })
//        }
//    );
});

router.get("/words", (req,res) =>{
    var wordsList = vocabData.getAllWords().then(function (wordList) {
        console.log("Here getAllWords");
        //console.log(wordList);
        res.json({words: wordList});
        return true;
    });
});


module.exports = router;