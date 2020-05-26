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
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const bcrypt = require('bcryptjs')

const mongoose = require('./configdb/db');
const User = require('./models/user');

const app = express()
app.use(bodyParser.json());
app.use(cors());


//WEB SERIVCE
//NOM WEB SERIVCE = methode + path
//GET POST
//le 1er : objet => Request : on peut manipuler les données eli jeyin lel WS
//le 2eme : objet => Respose : on peut manipluer les donne eli nhebou nab3thouhom mel WS
app.get('/', function (req, res) {
    res.send("Welcome to the server ");
})


app.get('/users', (req, res) => {

    User.find()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            res.send({ message: "Error" });
        })
})

//requette HTTP => GET , POST 
app.post('/user/register', (req, res) => {
    //1- recupération des données
    let data = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password, salt)

    //2- enregistrement data => BD
    let user = new User({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        password: hashedPassword,
    });

    //objet eli raj3ou el fonction save , ynajm ykoun
    //1- objet JSON fih les odnnées ei tsajlou , en cas de succceees
    //2- object JSON fih des erreurs
    user.save()
        .then((doc) => {
            res.status(200).send({ message: "User registered successfully !" });
        })
        .catch((err) => {
            res.status(400).send({ message: "Error" });
        })
});

app.post('/user/login', (req, res) => {
    let data = req.body;
    console.log(data);
    res.send({ message: "User Logged successfully !" });
})

//1 - creation du sreveur 
//callback function
//ES6 , ECMAScript 
//arrow function =>
app.listen(3000, () => console.log("Server Stated !"))