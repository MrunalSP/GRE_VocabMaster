const mongoCollections = require("../config/mongoCollections");
const vocab = mongoCollections.vocab;
//const vocab = require("./vocab");
var   Guid = require('Guid');

const uuid = require('node-uuid');
const runStartup = require("../startup.js")

runStartup.runVocabSetup();

let exportedMethods = {
    getAllWords() {
        return vocab().then((vocabCollection) => {
            console.log("Here");
            return vocabCollection.find({}).toArray();
        })
    },
    getWordById(id) {
        return vocab().then((vocabCollection) => {
            return vocabCollection.findOne({ word_id: id }).then((word) => {
                if (!word) throw "Word not found";
                return word;
            });
        });
    }
}

module.exports = exportedMethods;