/**
 * express : tsahlelna el creation des WS 
 * cors : eli y5li les WS tilisable par les autres applications
 * body-parser : y7aded naw3eyet les données eli de5lin/5arjin mel backend 
 * nodemon : refresh automatique mta3 serveur
 * bcryptjs : ta3mlelna el cryptage de donnée
 * mongoose : ODM ,
 * sequelize : ORM ,
 * ODM , ORM ,
 * Object Document Mapping => NoSQL
 * Object Relational Mapping => SQL
 */

//Importation des bibliothéque
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcryptjs')

//Importation DB
const mongoose = require('./configdb/db');

//Importation Controllers
const userController = require('./controllers/userController');
const instructorController = require('./controllers/instructorController');

const app = express()
app.use(bodyParser.json());
app.use(cors());

app.use('/user',userController);
app.use('/instructor',instructorController);

//WEB SERIVCE
//NOM WEB SERIVCE = methode + path
//GET POST
//le 1er : objet => Request : on peut manipuler les données eli jeyin lel WS
//le 2eme : objet => Respose : on peut manipluer les donne eli nhebou nab3thouhom mel WS
app.get('/', function (req, res) {
    res.send("Welcome to the server ");
})
//USER , INSTRUCTOR , SUPER_ADMIN


//1 - creation du sreveur 
//callback function
//ES6 , ECMAScript 
//arrow function =>
app.listen(3000, () => console.log("Server Stated !"))