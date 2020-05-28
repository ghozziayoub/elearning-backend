const express = require('express');

const Instructor = require('./../models/instructor');


const app = express();

app.post('/register', (req, res) => {
    //1- recupération des données
    let data = req.body;

    //2- creation d'un objet
    let instructor = new Instructor({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email,
        password: generatePassword()
    });

    //3- save to database and return response to FRONT
    instructor.save()
        .then(() => {
            res.status(201).send({ message: "instructor saved success !" })
        })
        .catch(() => {
            res.status(400).send({ message: "instructor not saved !" })
        })

});

app.get('/all', (req, res) => {

    Instructor.find()
        .then((docs)=>{
            res.status(200).send(docs);
        })
        .catch(()=>{
            res.status(400).send({ message: "Error Find !" })
        })

})

app.get('/one/:idInstructor', (req, res) => {

    let id = req.params.idInstructor;

    Instructor.findOne({_id:id})
        .then((doc)=>{
            res.status(200).send(doc);
        })
        .catch(()=>{
            res.status(400).send({ message: "Error Find !" })
        })

})

function generatePassword() {
    let pass = "123456789";

    return pass;
}

module.exports = app;