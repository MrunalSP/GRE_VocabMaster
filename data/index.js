const questionsData = require("./questions");
const resultsData = require("./results");
const testsData = require("./tests");
const usersData = require("./users");
const vocabData = require("./vocab");
const sessionsData = require("./sessions");

module.exports = {
    users: usersData,
    vocab: vocabData,
    tests: testsData,
    results: resultsData,
    questions: questionsData,
    sessions: sessionsData
};