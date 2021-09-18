// importing dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// defining the Express app
const app = express();

// adding Helmet to enhance API security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an object to work as testing api
const message = { message: "Welcome to Contactkeeper API...😉" };

// defining an endpoint to return all users
app.get("/", (req, res) => {
  res.json(message);
});

// Define Routes
app.use("/api/register", require("./routes/register.js"));
app.use("/api/login", require("./routes/login.js"));
app.use("/api/contacts", require("./routes/contacts.js"));

const PORT = process.env.PORT || 5000;

// starting the server
app.listen(PORT, () => {
  console.log(`Server started on the port ${PORT}`);
});