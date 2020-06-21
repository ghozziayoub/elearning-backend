const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const fs = require('fs');

//connect-multiparty OU multer
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './public' });

const mongoose = require('./configdb/db');

const userController = require('./controllers/userController');
const instructorController = require('./controllers/instructorController');
const classroomController = require('./controllers/classroomController');
const RequestsClassroomController = require('./controllers/requestsClassroomController');
const adminController = require('./controllers/adminController');

const Admin = require('./models/admin');

const app = express();
//make public DIR accessible
app.use(express.static('public'));
//Accept Files
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userController);
app.use('/instructor', instructorController);
app.use('/classroom', classroomController);
app.use('/requestsClassroom', RequestsClassroomController);
app.use('/admin', adminController);

app.get('/', function (req, res) {
    res.send("Welcome to the server !");
})

app.get('/testChartJsData', (req, res) => {
    let years = ['Ali', 'Fathi', 'Mouldi', 'Mohamed'];
    let data = [
        { data: [4, 16, 15, 34], label: 'Series A' }
    ];

    res.status(200).send({ years, data })
});

app.post('/testFileAndData', multipartMiddleware, (req, res) => {

    if (req.files) {
        let path = req.files.image.path;
        let ext = path.substr(path.indexOf('.'));
        let newName = "abc";
        fs.renameSync(path, "public/" + newName + ext);
    }
    res.status(200).send('OK');
})

const port = 3000 || process.env.PORT

app.listen(port, async () => {

    try {
        let admins = await Admin.find();
        if (admins.length == 0) {
            let salt = bcrypt.genSaltSync(10);
            let hashedPassword = bcrypt.hashSync("123456789", salt);
            let admin = new Admin({
                email: "admin@gmail.com",
                password: hashedPassword
            })
            let savedAdmin = await admin.save();
            console.log("Admin Added");
        }

        res.status(200).send("Welcome to the server");
    } catch (error) {
        console.log(error);
    }

});