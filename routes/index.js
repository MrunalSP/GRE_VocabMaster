const loginRoutes = require("./loginpage");
const flashCardsRoutes = require("./flashcards"); 
const testRoutes = require("./tests");

const constructorMethod = (app) => {
    app.use("/loginpage", loginRoutes);
    app.use("/flashcards",flashCardsRoutes);
    app.use("/tests",testRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    })
};

module.exports = constructorMethod