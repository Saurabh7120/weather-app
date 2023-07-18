const express = require('express');
const serverless = require("serverless-http");
require('dotenv').config()
var cors = require("cors");
const app = express();

var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}
app.use(cors(options));

const configRoutes = require('./routes');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

configRoutes(app);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log("Server has been initialized!");
  console.log(`Your routes will be running on ${PORT}`);
});

module.exports = app;
module.exports.handler = serverless(app);