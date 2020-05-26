const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.status(200).send({ message: "Welcome to instructor Controller" })
})

app.post('/register',(req,res)=>{
    //el API hetha ykhali el instructor ya3mel compte
    res.status(200).send({ message: "Welcome to POST instructor/register" })
})

app.post('/addCourse',(req,res)=>{
    //el API hetha ykhali el instructor yzid cours
    res.status(200).send({ message: "Welcome to POST instructor/addCourse" })
})

app.get('/allCourses/:idInstructor',(req,res)=>{
    //el API hetha ykhali el instructor yzid cours
    res.status(200).send({ message: "Welcome to GET instructor/allCourses/:idInstructor" })
})


module.exports = app ;