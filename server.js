const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const routes = require('./routes');
// const connectDb = require("./config");

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use('/', routes);

// Port
const PORT = process.env.PORT || 8080

// listen
app.listen(PORT, () => {
    console.log(`Server Running On Port ${PORT}`. bgCyan.white)
});