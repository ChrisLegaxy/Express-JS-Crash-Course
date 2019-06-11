// Imports
const express = require("express");
const path = require('path');
const logger = require("./middleware/logger")

// Initializing express
const app = express();

// Port checking from env file
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(logger);

// Static Folder
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/api/members', require("./routes/api/members"))


app.listen(port, () => console.log(`Server is Running on Port ${port}!`))