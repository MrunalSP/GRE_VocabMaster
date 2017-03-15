const express = require('express');
const router = express.Router();
const data = require('../data');
const questionsData = data.questions;

router.get("/", (req, res) => {
    res.render("tests/home", {partial: "Tests-partial"} );
});

router.get("/questionList", (req,res) =>{
    var questionList = questionsData.getAllQuestions().then(function (questionList) {
        res.json({questions: questionList});
        return true;
    });
});

router.post("/",(req,res) => {
    console.log(req.body.resultArray);
    res.render("tests/result",{partial: "Tests-partial", resultArray: req.body.resultArray, correctCount: req.body.correctCount, no_response: req.body.no_response});
});

module.exports = router;