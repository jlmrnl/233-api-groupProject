const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String,
        required: true,
    },

    subjectsHandled: {
        type: [String],
        required: false,
    },

    department: {
        type: String,
        required: false,
    }
})

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher