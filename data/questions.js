const mongoCollections = require("../config/mongoCollections");
const questions = mongoCollections.questions;
//const vocab = require("./vocab");
const uuid = require('node-uuid');
const runStartup = require("../startup.js")

runStartup.runQuestionSetup();

let exportedMethods = {
    getAllQuestions() {
        return questions().then((questionCollection) => {
            console.log("Reached here in getAllQuestions");
            return questionCollection.find({}).toArray();
        })
    },
    getQuestionById(id) {
        return questions().then((questionCollection) => {
            return questionCollection.findOne({ question_id: question_id }).then((question) => {
                if (!question) throw "Question not found";
                return question;
            });
        });
    }
    
}

module.exports = exportedMethods;