const configRoutes = require("./routes");

const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
var cookieParser = require('cookie-parser');
var Guid = require('Guid');
const app = express();

const static = express.static(__dirname + '/public');


app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json


app.use(function (request, response, next) {
    // If we had a user system, we could check to see if we could access /admin

    console.log("The request has all the following cookies:");
    console.log(request.cookies);
    
    if (request.cookies.session_id) {
        console.log("This user's session id is " + request.cookies.session_id);
    } else {
        console.log("This user has never accessed the site before");
        var id =  Guid.create().toString();
        var now = new Date();
    var expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);
        response.cookie("session_id", id, {expires: expiresAt});
    }
/*
    if (req.cookies.expires.getHours() === 0) {
        console.log("now clearing the cookie");
        
        var anHourAgo = new Date();
        anHourAgo.setHours(anHourAgo.getHours() -1);
        
        // invalidate, then clear so that lastAccessed no longer shows up on the
        // cookie object
        response.cookie("lastAccessed", "", { expires: expiresAt });
        response.clearCookie("lastAccessed");

        next();
        return;
    }*/
    // THIS SECTION WILL EXPIRE THE COOKIE EVERY 5th request
   /* if (currentNumberOfRequests % 5 === 0) {
        console.log("now clearing the cookie");

        var anHourAgo = new Date();
        anHourAgo.setHours(anHourAgo.getHours() - 1);

        // invalidate, then clear so that lastAccessed no longer shows up on the
        // cookie object
        response.cookie("lastAccessed", "", { expires: expiresAt });
        response.clearCookie("lastAccessed");

        next();
        return;
    }
*/
/*    var now = new Date();
    var expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1);

    // Providing a third parameter is optional, but allows you to set options for the cookies.
    // see: http://expressjs.com/en/api.html#res.cookie
    // for details on what you can do!
    response.cookie("lastAccessed", now.toString(), { expires: expiresAt });
  */  
    next();
});


const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
        // Specify helpers which are only registered on this instance.
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing === "number")
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    },
    partialsDir: [
        'views/partials/'
    ]
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
    // If the user posts to the server with a property called _method, rewrite the request's method
    // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
    // rewritten in this middleware to a PUT route
    if (req.body && req.body._method) {
        req.method = req.body._method;
        delete req.body._method;
    }

    // let the next middleware run:
    next();
};

app.use("/public", static);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Your routes will be running on http://localhost:3000");
});