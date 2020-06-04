const mongoose = require('mongoose');

const RequestsClassroomSchema = new mongoose.Schema({

    idStudent: {
        type: String,
        required: true
    },
    idClassroom: {
        type: String,
        required: true
    }

});

const RequestsClassroom = mongoose.model("requestsClassroom", RequestsClassroomSchema);

module.exports = RequestsClassroom;