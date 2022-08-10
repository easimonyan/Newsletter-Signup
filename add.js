// jshint esversion: 6 

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res) {
    mailchimp.setConfig({
        apiKey: "c53f5dc8bd80b05ff510fe2b7181aaac-us18",
        server: "us18",
      });
      
      const listId = "a47acc395d";
        const subscribingUser = {
        firstName: "Prudence",
        lastName: "McVankab",
        email: "e.a.simonyan@gmail.com"
        };

    async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
    email_address: subscribingUser.email,
    status: "subscribed",
    merge_fields: {
      FNAME: subscribingUser.firstName,
      LNAME: subscribingUser.lastName
    }
    });

    console.log(
    `Successfully added contact as an audience member. The contact's id is ${
      response.id
    }.`
    );
    }

    run();
      }
);




app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})

// API Key Mailchimp
// c53f5dc8bd80b05ff510fe2b7181aaac-us18

// List ID
// a47acc395d