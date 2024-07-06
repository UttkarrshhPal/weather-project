const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const apiKey = "3d722304b0b66dfa2c45749167161a2d";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDiscription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            
            res.write("<p><h1>The temperature in "+ query +" is " + temp + " degrees Celsius.</h1></p>");
            res.write("<p><h1>The weather is currently " + weatherDiscription + ".</h1></p>");
            res.write("<img src="+ src +">");
            res.send();
        });
    })
})




app.listen(3000, function(){
    console.log("The server is running on port 3000");
})