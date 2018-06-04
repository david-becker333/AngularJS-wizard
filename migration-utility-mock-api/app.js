var express = require('express')
  , cors = require('cors')
  , app = express()
  , bodyParser = require('body-parser');

 var fs = require("fs"),
    json;

var corsOptions = {
  "origin": "*",
  "methods": ['GET', 'PUT', 'POST'],
  "preflightContinue": true,
  "optionsSuccessStatus": 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
};

var apiUriPath = "/migration/api/v1";
var toApiUri = function(resource) {
    return apiUriPath + "/" + resource
};
var fileUriPath = "/migration/api/v1";
var toFileApiUri = function(resource) {
    return fileUriPath + "/" + resource + ".json";
};
var jsonResponseContentType = {'content-type': 'application/json; charset=utf-8'};

function readJsonFileSync(filepath, encoding){

    if (typeof (encoding) == 'undefined'){
        encoding = 'utf8';
    }
    var file = fs.readFileSync(filepath, encoding);
    return JSON.parse(file);
}

function getConfig(file){
    
    var filepath = __dirname + file;
    return readJsonFileSync(filepath);
}
app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


/*****************************
Appliance Management endpoints
******************************/

app.get(toApiUri('jobs'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('jobs')));
})

app.get(toApiUri('jobdetails'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('jobdetails')));
})

app.get(toApiUri('canceljob'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('canceljob')));
})

app.get(toApiUri('migrationjobdetail'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('migrationjobdetail')));
})

app.get(toApiUri('nbajobdetail'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('nbajobdetail')));
})

app.get(toApiUri('sourcemedia'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('sourcemedia')));
})

app.get(toApiUri('sourcedisk'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('sourcedisk')));
})

app.get(toApiUri('destinationmedia'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('destinationmedia')));
})

app.get(toApiUri('destinationdisk'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('destinationdisk')));
})

app.get(toApiUri('savemigrationjob'), function (req, res) {

    res.set(jsonResponseContentType)
    res.send(getConfig(toFileApiUri('savemigrationjob')));
})



var server = app.listen(9000,function(){
    console.log("We have started our server on port 9000");
});



