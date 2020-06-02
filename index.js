const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('./configdb/db');

const userController = require('./controllers/userController');
const instructorController = require('./controllers/instructorController');
const classroomController = require('./controllers/classroomController');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userController);
app.use('/instructor', instructorController);
app.use('/classroom', classroomController);

app.get('/', function (req, res) {
    res.send("Welcome to the server !");
})

app.listen(3000, () => console.log("Server Stated !"));