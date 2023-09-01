const express = require('express');
const Student = require('../models/Student.js');
const router = express.Router();

// Create a new student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all students
router.get('/', async (req, res) => {
  try {
    const student = await Student.find();
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a student
// router.put('/:id', async (req, res) => {
//   try {
//     const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(student);
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

router.get('/getMany', async(req, res) => {
  try {
    let body = req.body;
    const student = await Student.find({ _id: body._id });

    if (student.length > 0) {
      res.status(200).json(student)
    } else {
      res.send('No matching records found');
    }
  } catch (error) {
    res.status(500).json({message: error.message})
  }
})


// Delete a student
// router.delete('/:id', async (req, res) => {
//   try {
//     const student = await Student.findByIdAndRemove(req.params.id);
//     res.json(student);
//     console.log("deleted successfully");
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });

router.delete('/deleteMany', async (req, res) => {
  try {
    const { _id } = req.body; 
    const students = await Student.find({ _id: { $in: _id } });

    if (students.length > 0) {
      const result = await Student.deleteMany({ _id: { $in: _id } });
      res.status(200).send(`${result.deletedCount} record(s) deleted`);
    } else {
      res.status(404).send('No matching records found to delete');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting data');
  }
});


module.exports = router

