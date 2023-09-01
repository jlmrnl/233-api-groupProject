const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },

  course: {
    type: String,
    required: false,
  },

  section: {
    type: String,
    required: false,
  },
  
  
},
{
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);
module.exports = Student