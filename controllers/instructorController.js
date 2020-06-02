const express = require('express');
const nodemailer = require("nodemailer");

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

app.get('/all', (req, res) => {

    Instructor.find()
        .then((docs) => {
            res.status(200).send(docs);
        })
        .catch(() => {
            res.status(400).send({ message: "Error Find !" })
        })

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

//FIXME: cryptage password
//PATCH & PUT
app.patch('/updateAccountState/:idInstructor', (req, res) => {

    let id = req.params.idInstructor;

    Instructor.findOne({ _id: id })
        .then((doc) => {

            if (!doc.password && !doc.accountState) {
                let newPassword = generatePassword();

                //start sending email code

                // async..await is not allowed in global scope, must use a wrapper
                async function main() {
                   
                    // create reusable transporter object using the default SMTP transport
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                            user: "tonemail@gmail.com", // generated ethereal user
                            pass: "tonpassword" , // generated ethereal password
                        },
                    });

                    let mailOptions = {
                        from: '"Support 👨‍💻" <tonemail@gmail.com>', // sender address
                        to: doc.email, // list of receivers
                        subject: "Activation Compte ✔", // Subject line
                        text: "Votre compte est activé", // plain text body
                        html: "<b>Votre compte est activé</b>" // html body
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            return console.log(error.message);
                        }
                        console.log('success');
                    });

                  }

                main().catch(console.error);
                //end sending email code


                doc.password = newPassword;
            }

            doc.accountState = !doc.accountState;
            doc.save();
            res.status(200).send({ message: "Instructor's Account State Updated !" });
        })
        .catch(() => {
            res.status(400).send({ message: "Error Find !" });
        })

});

//FIXME: cryptage password
app.patch('/updateInfo', (req, res) => {

    let newData = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
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
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = app;