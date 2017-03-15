const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
var   Guid = require('Guid');

//const vocab = require("./vocab");
const uuid = require('node-uuid');
const runStartup = require("../startup.js")

runStartup.runUserSetup();

let exportedMethods = {
    addUser(userData) {
        return users().then((userCollection) => {
            return userCollection.insertOne({
                    user_id: Guid.create().toString(),
                    firstName: userData.firstName ,
                    lastName: userData.lastName,
                    gender: userData.gender,
                    age: userData.age,
                    address: userData.address,
                    education: userData.education,
                    gpa: userData.gpa,
                    login: userData.login,
                    password: userData.password
                }).then(function (newDoc) {
                    return newDoc;
                });
            //return userCollection.find({}).toArray();
        });
    },
    getUserByLoginName(login_id) {
        return users().then((userCollection) => {
            return userCollection.findOne({ login: login_id }).then((user) => {
                if (!user) throw "User not found";
                
                return user;
            });
        });
    },
    getUserByUserId(user_id) {
        return users().then((userCollection) => {
            return userCollection.findOne({ user_id: user_id }).then((user) => {
                if (!user) throw "User not found";
                
                return user;
            });
        });
    }
}

module.exports = exportedMethods;