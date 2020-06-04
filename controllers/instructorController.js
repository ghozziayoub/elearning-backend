const express = require('express');
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Instructor = require('./../models/instructor');

const app = express();

//POST
app.post('/register', (req, res) => {
    //1- recupération des données
    let data = req.body;

    //2- creation d'un objet
    let instructor = new Instructor({
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        email: data.email
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

app.post('/login', (req, res) => {

    let emailFromFront = req.body.email;
    let passwordFromFront = req.body.password;

    Instructor.findOne({ email: emailFromFront })
        .then((doc) => {

            if (!doc) {
                res.status(404).send({ "message": "email incorrect !" });
            }
            else {

                let compare = bcrypt.compareSync(passwordFromFront, doc.password);

                if (!compare) {
                    res.status(404).send({ "message": "password incorrect !" });
                }
                else {

                    if (!doc.accountState) {
                        res.status(404).send({ "message": "You cannot Login !" });
                    }
                    else {

                        let obj = {
                            idInstructor: doc._id,
                            role: "instructor"
                        };

                        let myToken = jwt.sign(obj, "mySecretKey");

                        res.status(200).send({ token: myToken });

                    }

                }

            }




        })
        .catch(() => {
            res.status(400).send({ message: "Error Find !" })
        })


});

//GET
app.get('/all', async (req, res) => {
    try {
        let instructors = await Instructor.find();
        res.status(200).send(instructors);
    } catch {
        res.status(400).send({ message: "Error Find !" })
    }
});

app.get('/one/:idInstructor', (req, res) => {

    let id = req.params.idInstructor;

    Instructor.findOne({ _id: id })
        .then((doc) => {
            res.status(200).send(doc);
        })
        .catch(() => {
            res.status(400).send({ message: "Error Find !" })
        })

});

//DELETE
app.delete('/delete/:idInstructor', (req, res) => {

    let id = req.params.idInstructor;

    Instructor.findOneAndDelete({ _id: id })
        .then((doc) => {
            res.status(200).send({ message: "Instructor Deleted !" });
        })
        .catch(() => {
            res.status(400).send({ message: "Error Find !" });
        })

});

//PATCH & PUT
app.patch('/updateAccountState/:idInstructor', (req, res) => {

    let id = req.params.idInstructor;

    Instructor.findOne({ _id: id })
        .then((doc) => {

            if (!doc.password && !doc.accountState) {
                let newPassword = generatePassword();

                const salt = bcrypt.genSaltSync(10);
                const hashedPassword = bcrypt.hashSync(newPassword, salt);

                //start sending email code
                /*
                async function main() {

                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false,
                        auth: {
                            user: "tonemail@gmail.com",
                            pass: "tonpassword",
                        },
                    });

                    let mailOptions = {
                        from: '"Support 👨‍💻" <tonemail@gmail.com>',
                        to: doc.email,
                        subject: "Activation Compte ✔",
                        text: "Votre compte est activé",
                        html: "<b>Votre compte est activé</b>"
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error.message);
                        }
                        console.log('success');
                    });

                }
                main().catch(console.error);
                */
                //end sending email code


                doc.password = hashedPassword;
            }

            doc.accountState = !doc.accountState;
            doc.save();
            res.status(200).send({ message: "Instructor's Account State Updated !" });
        })
        .catch(() => {
            res.status(400).send({ message: "Error Find !" });
        })

});

app.patch('/updateInfo', (req, res) => {

    const salt = bcrypt.genSaltSync(10);

    let newData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, salt)
    };

    Instructor.findOneAndUpdate({ _id: req.body.id }, newData)
        .then(() => {
            res.status(200).send({ message: "Instructor's Info Updated !" });
        })
        .catch(() => {
            res.status(400).send({ message: "Error Find !" });
        })

});

function generatePassword() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;

    for (var i = 0; i < 10; i++) {
        result = result + characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports = app;