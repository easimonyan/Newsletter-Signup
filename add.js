// jshint esversion: 6 

// *** Constant Require Section:
 
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
 
const app = express();
 
// *** Body Parser ***
app.use(bodyParser.urlencoded({extended: true}));
 
// *** Static Folder ***
app.use(express.static("public"));
// app.use("/public", express.static(path.join(__dirname, "public")));
 
// *** Tracking HTML File ***
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
});
 
// *** Signup Route ***
app.post("/", function(req, res){
 
    const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;
 
    // *** Construct Requesting data ***
    const data = {
        members: [
            {
              email_address: email,
              status: 'subscribed',
              merge_fields: {
                  FNAME: firstName,
                  LNAME: lastName
              }
            }
          ]
    }
 
    // *** Stringify inputed data ***
    const jsonData = JSON.stringify(data);
 
    // *** url = "https://<data center>.api.mailchimp.com/3.0/lists/{listID}";
    const url = "https://us18.api.mailchimp.com/3.0/lists/a47acc395d";
 
    const options = {
        method: "POST",
        auth: "text or name:c53f5dc8bd80b05ff510fe2b7181aaac-us18"
    };
    
    // *** Requesting and send back our data to mailchimp ***
    const request = https.request(url, options, function(response){
        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });
 
    request.write(jsonData);
    request.end();
    
 
});
 




app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})

// API Key Mailchimp
// c53f5dc8bd80b05ff510fe2b7181aaac-us18

// List ID
// a47acc395d
