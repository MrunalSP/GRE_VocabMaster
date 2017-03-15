const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }

        return _col;
    }
}

/* Now, you can list your collections here: */
module.exports = {
    questions: getCollectionFn("questions"),
    results: getCollectionFn("results"),
    tests: getCollectionFn("tests"),
    users: getCollectionFn("users"),
    vocab: getCollectionFn("vocab"),
    sessions: getCollectionFn("sessions")
};