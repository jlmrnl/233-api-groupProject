require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/student');
const teacherRoutes = require('./routes/teacher');

const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(express.json())

app.get('/', async (req, res) => {
  try{
    res.send('Hello World')
  }catch(error){
    console.log(error)
  }
})

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

mongoose.connect('mongodb+srv://admin@233-api.quwerig.mongodb.net/Enroll', {
  user: 'admin',
  pass: 'mvfv9jMMOSi9qIfc',
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('connected to mongoDB')
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// routes
app.use('/api/student', studentRoutes)
app.use('/api/teacher', teacherRoutes)

