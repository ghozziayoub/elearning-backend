const mongoose = require('mongoose');

const InstructorSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    accountState: {
        type: Boolean,
        default: false
    }
})

const Instructor = mongoose.model('instructor', InstructorSchema);

module.exports = Instructor;