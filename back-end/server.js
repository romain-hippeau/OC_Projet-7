const express = require("express");
const bodyParser = require("body-parser");
const helmet = require('helmet');
const path = require('path');
const cors = require("cors");

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(helmet());

// analyser les requêtes de type - application/json
app.use(bodyParser.json());

// analyser les requêtes de type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

//Chemin d'importation des images
app.use('/images', express.static(path.join(__dirname, 'images')));


const db = require("./models");

 
const Role = db.role;
  
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initial();
});
// function pour creer les routes
function initial() {
    Role.create({
      id: 1,
      name: "user"
    });
   
    Role.create({
      id: 2,
      name: "admin"
    });
  }
// simple route
app.get("/", (req, res) => {
  res.json({ message: "bonjour tout le monde" });
});

//routes
require('./routes/user.routes')(app);
// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});