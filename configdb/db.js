const mongoose = require('mongoose');

const options = {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect("mongodb://localhost:27017/elearning", options);

module.exports = mongoose;