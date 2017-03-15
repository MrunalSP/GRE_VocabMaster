const express = require('express');
const data = require('../data');
const userData = data.users;
const sessionData = data.sessions;
const router = express.Router();
//var cookieParser = require('cookie-parser');
var cookieParser = require('cookie-parser');

router.get("/", (req, res) => {
    res.render("login/loginpage", {layout: "login_main"});
});

var user_id = "";
router.post("/", (req, res) => {
    userData.getUserByLoginName(req.body.login_id).then((user) => {
        console.log(user);
        console.log(req.body);
        if(req.body.password === user.password)
        {
/*            console.log("setting cookie...");          
            res.cookie("session_id", req.cookies.session_id, {"user_id" : user.user_id, "firstName" : user.firstName, "lastName": user.lastName});
            console.log("cookie set correctly 1");            
            next();
            console.log("cookie set correctly 2");
*/
/*            var sessionInfo = {session_id : req.cookies.session_id, user_id: user.user_id, 
                firstName: user.firstName, lastName: user.lastName, login_id: user.login };
            var sessionPromise = sessionData.addSessionUserInfo(sessionInfo);
*/
            user_id = user.user_id;
            res.json({success: true, error: ""});
        }
        else
        {
        res.json({success: false, error: "password not matching"});
        }
    }).catch(() => {
        res.status(404).json({ success: false, error: "User not found" });
    });
    
});

router.get("/signup",(req,res) => {

    res.render("login/signupPage", {layout: "login_main"});

});

router.post("/signup",(req,res) => {
    console.log(req.body);
    var newDoc = userData.addUser(req.body);
    if(newDoc)
    {
        console.log(newDoc);
        res.json({success: true});
    }
    else{
    res.json({success: false});
    }
});

router.post("/results", (req, res) => {
    userData.getUserByUserId(user_id).then((user) => {
        console.log(user);
       /* res.render("login/profile", {
            partial: "Login-partial",
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.gender,
            age: user.age,
            address: user.address,
            education: user.education,
            gpa: user.gpa,
            login: user.login,
            password: user.password
        });*/
        console.log(req.body.resultArray);
        res.render("tests/result", {
        partial: "Result-partial",
        firstName : user.firstName,
        lastName : user.lastName, 
        resultArray: req.body.resultArray,
        correctCount: req.body.correctCount,
        no_response: req.body.no_response
        });

    }).catch(() => {
        res.status(404).json({ success: false, error: "User not found" });
    });
    
});


router.get("/profile", (req, res) => {
    console.log("HERE..........");
//    console.log(req.cookies);
//    console.log(req.body);
//    sessionData.getSessionBySessionId(req.cookies.session_id).then(
//        function (sessionInfo) {
//            console.log(sessionInfo);
            userData.getUserByUserId(user_id).then((user) => {
                console.log(user);
                res.render("login/profile", {
                    partial: "Login-partial",
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    age: user.age,
                    address: user.address,
                    education: user.education,
                    gpa: user.gpa,
                    login: user.login,
                    password: user.password
                });

            }).catch(() => {
            res.status(404).json({ success: false, error: "User not found" });
        });

});



module.exports = router;