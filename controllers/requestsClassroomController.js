const express = require('express');

const RequestsClassroom = require('./../models/requestsClassroom');

const app = express();

app.get('/all', (req, res) => {

    RequestsClassroom.find()
        .then((docs) => {
            res.status(200).send(docs);
        })
        .catch(() => {
            res.status(400).send({
                message: "Error Find !"
            })
        })
})

app.post('/add', (req, res) => {

    let data = req.body;

    let rc = new RequestsClassroom({
        idStudent: data.idStudent,
        idClassroom: data.idClassroom
    });

    rc.save()
        .then(() => {
            res.status(201).send({ message: "RequestsClassroom saved success !" })
        })
        .catch(() => {
            res.status(400).send({ message: "RequestsClassroom not saved !" })
        })
})





module.exports = app;