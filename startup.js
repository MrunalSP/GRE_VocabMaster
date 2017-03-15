var   Guid = require('Guid');
const mongoCollections = require("./config/mongoCollections");
const vocab = mongoCollections.vocab;
const questions = mongoCollections.questions;
const users = mongoCollections.users;

let exportedMethods = {

// Setting up the Vocab Data: 
    runVocabSetup() 
    {
        return vocab().then((vocabCollection) => {
            return vocabCollection.count().then(function (theCount) {
                console.log("Here in runVocabSetup...");
                console.log("Number of records: " + theCount);
                // the result of find() is a cursor to MongoDB, and we can call toArray() on it
                if (theCount > 0) {
                    console.log("Already setup vocab...");
                    return vocabCollection.find().toArray();
                }

                return vocabCollection.insertOne({
                    word_id: Guid.create().toString(),
                    word: "abate",
                    meaning: "becomes fewer or less intense",
                    usage: "Your enthusiasm for skiing might abate after falling off a ski lift and getting a mouthful of snow.",
                    synonym: "subside",
                    antonym: "amplify"
                }).then(function (newDoc) {
                    console.log("The newDoc is : ");
                    console.log(newDoc);
                    return newDoc;
                }).then(function () {
                    return vocabCollection.insertOne({
                        word_id: Guid.create().toString(),
                        word: "alienate",
                        meaning: "become unfriendly",
                        usage: "The talk show host was trying to help, but only alienated her viewers when she suggested that they cope with a tough economy by checking themselves into a spa.",
                        synonym: "separate",
                        antonym: "unite"
                    });
                }).then(function () {
                    return vocabCollection.insertOne({
                        word_id: Guid.create().toString(),
                        word: "chauvinism",
                        meaning: "extreme devotion to a belief or nation",
                        usage: "He is such a chauvinist that he denies that any other nation could be better than ours at anything.",
                        synonym: "nationalism",
                        antonym: "unbiased"
                    });
                }).then(function () {
                    return vocabCollection.insertOne({
                        word_id: Guid.create().toString(),
                        word: "eloquent",
                        meaning: "having a skillful way with words",
                        usage: "Wow, he is such an eloquent speaker, he could sell snow to Antarcticans.",
                        synonym: "affecting",
                        antonym: "unenthusiastic"
                    });
                }).then(function () {
                    return vocabCollection.insertOne({
                        word_id: Guid.create().toString(),
                        word: "germane",
                        meaning: "relevant, on topic",
                        usage: "Lets keep our comments germane to the issue of our campaign.",
                        synonym: "applicable",
                        antonym: "unsuitable"
                    });
                }).then(function () {
                    console.log("Done with all setup vocab...");
                    return vocabCollection.find().toArray();
                });
                
            });
        });
    },

    runUserSetup()
    {
        return users().then((userCollection) => {
            return userCollection.count().then(function (theCount) {
                console.log("Here in userSetup...");
                console.log("Number of records: " + theCount);
                // the result of find() is a cursor to MongoDB, and we can call toArray() on it
                if (theCount > 0) {
                    console.log("Already setup users...");
                    return userCollection.find().toArray();
                }
                
                return userCollection.insertOne({
                    user_id: Guid.create().toString(),
                    firstName: "admin" ,
                    lastName: "login",
                    gender: "abate",
                    age: 27,
                    address: "Jersey City, NJ",
                    education: "BS Computer Science",
                    gpa: 4,
                    login: "admin",
                    password: "admin"
                }).then(function (newDoc) {
                    //console.log("The newDoc is : ");
                    //console.log(newDoc);
                    return newDoc;
                });
            });
        });
    },
//Setting up the Question Data:
    runQuestionSetup() 
    {
        return questions().then((questionCollection) => {
            return questionCollection.count().then(function (theCount) {
                console.log("Here in runQuestionSetup...");
                console.log("Number of records: " + theCount);
                // the result of find() is a cursor to MongoDB, and we can call toArray() on it
                if (theCount > 0) {
                    console.log("Already setup Questions...");
                    return questionCollection.find().toArray();
                }

                return questionCollection.insertOne({
                    question_id: Guid.create().toString(),
                    question: "Inspite of any difficulties, your passion for learning should not become (less intense).Replace the word in bracket with a word." ,
                    options:["amplify", "become unfriendly","abate","unite"],
                    correctAnswer: "abate"
                }).then(function (newDoc) {
                    //console.log("The newDoc is : ");
                    //console.log(newDoc);
                    return newDoc;
                }).then(function () {
                    return questionCollection.insertOne({
                    question_id: Guid.create().toString(),
                    question: "Like many idealists, he was a severe critic of the faults of his own and other countries, and he added something to the increasing (Chauvinism) in Germany. Replace the word in bracket with a word.",
                    options:["patriotism", "become unfriendly","unbiased","unite"],
                    correctAnswer: "patriotism"
                    });
                }).then(function () {
                    return questionCollection.insertOne({
                    question_id: Guid.create().toString(),
                    question: "Grandma likes to (embellish) her knitting by hiding secret messages in the pattern.Replace the word in bracket with a word.",
                    options:["decorate","become unfriendly","unbiased","degrade"],
                    correctAnswer: "decorate"   
                    });
                }).then(function () {
                    return questionCollection.insertOne({
                    question_id: Guid.create().toString(),
                    question: "She was (eloquent) of speech and endowed with endurance.Replace the word in bracket with a word.",
                    options:["affecting", "become unfriendly","unbiased","unenthusiastic"],
                    correctAnswer: "affecting" 
                    });
                }).then(function () {
                    return questionCollection.insertOne({
                    question_id: Guid.create().toString(),
                    question: "Lets keep our comments (germane) to the issue of our campaign.Replace the word in bracket with a word.",
                    options:["affecting", "on topic","unbiased","unsuitable"],
                    correctAnswer: "on topic"    
                    });
                }).then(function () {
                    console.log("Done with all setup questions...");
                    return questionCollection.find().toArray();
                });
                
            });
        });
    }

}
// By exporting a function, we can run 
module.exports = exportedMethods;