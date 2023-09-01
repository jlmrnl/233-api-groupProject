const express = require('express');
const Teacher = require('../models/Teacher.js');
const router = express.Router();

// Create a new teacher
router.post('/', async (req, res) => {
  try {
    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all teacher
router.get('/', async (req, res) => {
  try {
    const teacher = await Teacher.find();
    res.json(teacher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a teacher
router.put('/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(teacher);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete a teacher
// router.delete('/:id', async (req, res) => {
//   try {
//     const teacher = await Teacher.findByIdAndRemove(req.params.id);
//     res.json(teacher);
//     console.log("deleted successfully");
//   } catch (error) {
//     res.status(404).json({ error: error.message });
//   }
// });
router.delete('/deleteMany', async (req, res) => {
  try {
    const { _id } = req.body; 
    const teacher = await Teacher.find({ _id: { $in: _id } });

    if (teacher.length > 0) {
      const result = await Teacher.deleteMany({ _id: { $in: _id } });
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

