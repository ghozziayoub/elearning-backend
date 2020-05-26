const express = require('express');

//Importation Models
const User = require('./../models/user');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome to User Controller" })
})

app.get('/all', (req, res) => {
    User.find()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            res.send({ message: "Error" });
        })
});

//requette HTTP => GET , POST 
app.post('/register', (req, res) => {
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

app.post('/login', (req, res) => {
    let data = req.body;
    console.log(data);
    res.send({ message: "User Logged successfully !" });
});

module.exports = app;