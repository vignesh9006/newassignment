// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.127017/passwords', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Define the password schema
const passwordSchema = new mongoose.Schema({
  password: String
});

const Password = mongoose.model('Password', passwordSchema);

// Create an Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Route to handle password strength checking
app.post('/check-password', (req, res) => {
  const password = req.body.password;

  // Check password strength
  let steps = 0;
  if (password.length < 6) {
    steps += 6 - password.length;
  } else if (password.length > 20) {
    steps += password.length - 20;
  }

  if (!/[a-z]/.test(password)) {
    steps++;
  }
  if (!/[A-Z]/.test(password)) {
    steps++;
  }
  if (!/[0-9]/.test(password)) {
    steps++;
  }

  for (let i = 0; i < password.length - 2; i++) {
    if (password[i] === password[i + 1] && password[i + 1] === password[i + 2]) {
      steps++;
      break;
    }
  }

  res.json({ steps });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
