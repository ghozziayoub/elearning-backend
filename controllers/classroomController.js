const express = require('express');

const Classroom = require('./../models/classroom');
const Instructor = require('./../models/instructor');


const app = express();

app.post('/add', (req, res) => {

    let data = req.body;

    let classroom = new Classroom({
        idInstructor: data.idInstructor,
        name: data.name
    });

    classroom.save()
        .then(() => {
            res.status(201).send({ message: "classroom saved success !" })
        })
        .catch(() => {
            res.status(400).send({ message: "classroom not saved !" })
        })
})

app.get('/instructorInfo/:idClassroom', (req, res) => {

    let idClassroom = req.params.idClassroom;

    Classroom.findOne({ _id: idClassroom })
        .then((doc) => {

            let idInstructor = doc.idInstructor;

            Instructor.findOne({ _id: idInstructor })
                .then((ins) => {
                    res.status(200).send(ins);
                })
                .catch(() => {
                    res.status(400).send({ message: "Error Find !" })
                })

        })
        .catch(() => {
            res.status(400).send({ message: "Error Find !" })
        })
})

app.get('/instructorClassrooms/:idInstructor', (req, res) => {

    let idIns = req.params.idInstructor;

    Classroom.find({ idInstructor: idIns })
        .then((doc) => {
            res.status(200).send(doc);
        })
        .catch(() => {
            res.status(400).send({
                message: "Error Find !"
            })
        })
})

module.exports = app;