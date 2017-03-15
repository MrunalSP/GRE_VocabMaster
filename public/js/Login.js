(function(){

    var loginButton = $("#loginButton");
    var cancelButton = $("#cancelButton");
    var signupButton = $("#signupButton");
    var submitButton = $("#submitButton");

    loginButton.click(function (form) { /*function to check userid & password*/
        /*the following code checkes whether the entered userid and password are matching*/
        var userId = document.getElementById("userid").value;
        var pswd = document.getElementById("pswd").value;
/*
        if (userId.value == "admin" && pswd.value == "admin") {
            console.log("Matched");
            window.open('http://localhost:3000/flashcards', "_self");
        }
        else {
            alert("Error Password or Username");
        }
        */
        console.log(userId);
        console.log(pswd);
        $.post("http://localhost:3000/loginpage/",
            {
                login_id: userId,
                password: pswd
            },
            function (result) {
                console.log(result);
                if (result.success === true) {
                    console.log("Matched");
                    window.open('http://localhost:3000/flashcards', "_self");
                }
                else {
                    alert("Error Password or Username");
                }
            });
    });

    cancelButton.click(function (form) {
        window.open('http://localhost:3000/loginpage', "_self");
    });

    signupButton.click(function (form) {
        window.open('http://localhost:3000/loginpage/signup', "_self");
    });

    submitButton.click(function (form) {
        var firstName = document.getElementById("firstName").value;
        var lastName = document.getElementById("lastName").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        var education = document.getElementById("education").value;
        var login_id = document.getElementById("login").value;
        var password = document.getElementById("password").value;
        var age = parseInt(document.getElementById("age").value);
        var gpa = parseInt(document.getElementById("gpa").value);
        var gender = "";
        if (document.getElementById("Male").checked) {
            gender = document.getElementById("Male").value;
        }
        else if (document.getElementById("Female").checked) {
            gender = document.getElementById("Female").value;
        }

        $.post("http://localhost:3000/loginpage/signup",
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                education: education,
                login: login_id,
                password: password,
                age: age,
                gpa: gpa,
                gender: gender,
                address: address
            },
            function (result) {               
                console.log(result);
                if(result.success === true)
                {
                    window.open("http://localhost:3000/loginpage","_self");
        
                }
            });

    });
})();