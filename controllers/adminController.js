const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('./../models/admin');

const app = express();

app.post('/login', (req, res) => {

    let emailFromFront = req.body.email;
    let passwordFromFront = req.body.password;

    Admin.findOne({ email: emailFromFront })
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
                    let obj = {
                        idAdmin: doc._id,
                        role: "admin"
                    };
                    let myToken = jwt.sign(obj, "mySecretKey");
                    res.status(200).send({ token: myToken });
                }
            }
        })
        .catch(() => {
            res.status(400).send({ message: "Error Find !" })
        })
});


module.exports = app;