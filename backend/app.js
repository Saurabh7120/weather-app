const express = require('express');
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

app.listen(3001, () => {
  console.log("Server has been initialized!");
  console.log('Your routes will be running on http://localhost:3000');
});