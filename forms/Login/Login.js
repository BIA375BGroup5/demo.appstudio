let req = ""
let query = ""
let results = ""
let netID = ""
let pw = "Bolognabaddie37!"
let allUserData = []

/*
loginPage.onshow = function() {
    query = "SELECT * FROM user"
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user" + netID + "&pass=" + pw + "$database=" + netID + "$query=" + query)
    if (req.status == 200) { //transit trip worked. 
        console.log(`The results are: \n ${results}`)
        results = JSON.parse(req.responseText)
        //console.log(`The parsed JSON string is converted to a JS object (an array of arrays): ${results} where results[0] is ${results[0]}, the first array in the JS results object.`)
        if (results.length == 0)
            lblMessage.value = "There are no customers in the database."
        else {
            let message = ""
            for (i = 0; i < results.length; i++)
                message = message + results[i][1] + "\n"
            inptNetID.value = message
        }
    } else // the transit didn't work - bad wifi? server turned off?
        lblMessage.value = "Error code: " + req.status
}
*/

btnLogin.onclick = function() {
    let inputUsername = inptNetID.value
    let inputPassword = inptPassword.value
    query = `SELECT user_id FROM user`
    req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=djm42254&pass=" + pw + "&database=375groupb5&query=" + query)
    if (req.status == 200) { //transit worked.
        console.log(req.status)
        console.log(req.responseText)
        usernames = JSON.parse(req.responseText)
        console.log(usernames)
        query = `SELECT password FROM user`
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=djm42254&pass=" + pw + "&database=375groupb5&query=" + query)
        if (req.status == 200) { //transit worked.
            console.log(req.status)
            console.log(req.responseText)
            passwords = JSON.parse(req.responseText)
            console.log(passwords)
            validate(inputUsername, inputPassword);

            function validate(username, password) {
                for (var i = 0; i < usernames.length; i++) {
                    if ((inputUsername == usernames[i]) && (inputPassword == passwords[i])) {
                        valid = true;
                        break;
                    }
                }
            }
            if (valid = true) {
                alert("Valid Credentials")
                ChangeForm(homePage) //NO HOMEPAGE YET
                query = `SELECT  user_id FROM user WHERE  username = "` + inputUsername + `"`
                req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=djm42254&pass=" + pw + "&database=375groupb5&query=" + query)
                if (req.status == 200) { //transit worked.
                    console.log(req.status)
                    console.log(req.responseText)
                    userID = JSON.parse(req.responseText)
                    userID = Number(userID)
                    console.log(userID)
                } else {
                    alert(`transit error`)
                }
            } else {
                alert("Invalid Credentials")
                inptUsername.value = ""
                inptPassword.value = ""
            }
        } else {
            // transit error
            console.log(`Error: ${req.status}`);
        }
    } else {
        // transit error
        console.log(`Error: ${req.status}`);
    }
}