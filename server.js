const express = require("express");
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(express.static('public'))

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

require("./app/routes/tutorial.routes")(app);
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
