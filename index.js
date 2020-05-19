/**
 * express : tsahlelna el creation des WS 
 * cors : eli y5li les WS tilisable par les autres applications
 * body-parser : y7aded naw3eyet les données eli de5lin/5arjin mel backend 
 * nodemon : refresh automatique mta3 serveur
 */
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json());

//WEB SERIVCE
//NOM WEB SERIVCE = methode + path
//GET POST
//le 1er : objet => Request : on peut manipuler les données eli jeyin lel WS
//le 2eme : objet => Respose : on peut manipluer les donne eli nhebou nab3thouhom mel WS
app.get('/', function (req, res) {
    res.send("Welcome to the server ");
})

//requette HTTP => GET , POST 
app.post('/user/register', (req, res) => {
    //1- recupération des données
    let data = req.body;
    console.log(data);
    
    //2- enregistrement data => BD

    //3- return lel front
    res.send({ message: "User registered successfully !" });
});

app.post('/user/login',(req,res)=>{
    let data = req.body ;
    console.log(data);
    res.send({ message: "User Logged successfully !" });
})

//1 - creation du sreveur 
//callback function
//ES6 , ECMAScript 
//arrow function =>
app.listen(3000, () => console.log("Server Stated !"))