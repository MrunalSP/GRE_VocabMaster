const mongoCollections = require("../config/mongoCollections");
const sessions = mongoCollections.sessions;
var   Guid = require('Guid');

//const vocab = require("./vocab");
const uuid = require('node-uuid');

let exportedMethods = {
    addSessionUserInfo(sessionData) {
        return sessions().then((sessionCollection) => {
            return sessionCollection.insertOne({
                    session_id: sessionData.session_id,
                    firstName: sessionData.firstName ,
                    lastName: sessionData.lastName,
                    user_id: sessionData.user_id,
                    login_id: sessionData.login_id
                }).then(function (newDoc) {
                    return newDoc;
                });
            //return userCollection.find({}).toArray();
        });
    },
    getSessionBySessionId(session_id) {
        return sessions().then((sessionCollection) => {
            return sessionCollection.findOne({ session_id: session_id }).then((sessionInfo) => {
                if (!sessionInfo) throw "User not found";
                return sessionInfo;
            });
        });
    }
}

module.exports = exportedMethods;