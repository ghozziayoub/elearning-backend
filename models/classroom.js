const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({

    idInstructor: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    students: {
        type: Array,
        default: []
    }
});

const Classroom = mongoose.model("classroom", ClassroomSchema);

module.exports = Classroom;